import type { Nilable } from '@rothko-ui/utils';
import { scopedClasses as sc } from '@rothko-ui/utils';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import type { DragDelta, DragEvent } from '../../../library/utils/domUtils';
import {
  addEvent,
  calculateXYDragPosn,
  getTouch,
  getTouchIdentifier,
  isMainClick,
  isMouseEvent,
  removeEvent,
} from '../../../library/utils/domUtils';
import { getOffsetFactory } from '../sliderUtils';
import useIsMounted from '../../../library/hooks/useIsMounted';
import type { WithAriaControls, WithAriaLabel } from '../../../types';
import styles from './SliderHandle.module.scss';

const scoppedClasses = sc(styles);

type DraggableEvents = {
  start: string;
  move: string;
  stop: string;
};

const touchEvents: DraggableEvents = {
  start: 'touchstart',
  move: 'touchmove',
  stop: 'touchend',
};

const mouseEvents: DraggableEvents = {
  start: 'mousedown',
  move: 'mousemove',
  stop: 'mouseup',
};

type WithAria<T> = WithAriaControls<WithAriaLabel<T>>;

type SliderHandleProps = WithAria<{
  onChange: (v: number) => void;
  onDrag?: (e: DragEvent) => void;
  onMouseDown?: (e: DragEvent) => void;
  vertical?: boolean;
  disabled?: boolean;
  value: number;
  min?: number;
  max: number;
}>;

const SliderHandle = ({
  disabled,
  vertical,
  value,
  min = 0,
  max,
  onDrag,
  onMouseDown,
  onChange,
  'aria-label': ariaLabel,
  'aria-controls': ariaControls,
}: SliderHandleProps) => {
  const isMounted = useIsMounted();

  const handleRef = useRef<HTMLButtonElement | null>(null);
  const onChangeRef = useRef(onChange);
  const isDraggingRef = useRef<boolean>(false);
  const touchIdentifierRef = useRef<Nilable<number>>(null);
  const deltaRef = useRef<DragDelta>({ xDel: 0, yDel: 0 });

  const getOffset = useMemo(() => getOffsetFactory({ min, max }), [min, max]);

  /*
   * Awful hack in order to get updates to "onChange" to reflect in the drag handlers.
   * See the MultiSlider component for an example of the type of updates
   */
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const focus = useCallback(() => {
    handleRef.current?.focus();
  }, [handleRef]);

  const blur = useCallback(() => {
    handleRef.current?.blur();
  }, [handleRef]);

  const handleDrag = useCallback(
    (evt: DragEvent) => {
      if (!isDraggingRef.current || !isMounted()) return;

      const handle = handleRef.current;
      if (!handle) {
        throw new Error('Handle not mounted');
      }

      const { rawX, rawY, width, height } = calculateXYDragPosn({
        evt,
        forElement: handle,
        dragDelta: deltaRef.current,
        touchIdentifier: touchIdentifierRef.current,
      });

      // adjust for the CSS translate property on the button
      // honestly... idk.. im using the golden ratio below...lol
      const adjustment = (1.61803398 * (vertical ? handle.offsetHeight : handle.clientWidth)) / 4;

      // calculate the value
      const sliderPxLen = (vertical ? height : width) + adjustment;
      const pxOffset = (vertical ? rawY : rawX) + adjustment;

      const ratio = Math.min(Math.max(pxOffset, 0), sliderPxLen) / sliderPxLen;
      const value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;

      onChangeRef.current(value);
      onDrag?.(evt);
    },
    [
      touchIdentifierRef,
      isDraggingRef,
      handleRef,
      onChangeRef,
      onDrag,
      min,
      vertical,
      max,
      isMounted,
    ]
  );

  const handleDragStop = useCallback(
    (_: DragEvent, isTouch?: boolean) => {
      if (!isDraggingRef.current || !isMounted()) return;

      const handle = handleRef.current;
      if (!handle) {
        throw new Error('Handle not mounted');
      }

      isDraggingRef.current = false;
      blur();
      // Remove event handlers
      removeEvent(handle.ownerDocument, isTouch ? touchEvents.move : mouseEvents.move, handleDrag);
      removeEvent(
        handle.ownerDocument,
        isTouch ? touchEvents.stop : mouseEvents.stop,
        handleDragStop
      );
    },
    [handleRef, isDraggingRef, isMounted, blur, handleDrag]
  );

  const handleDragStart = useCallback(
    (evt: DragEvent, isTouch?: boolean) => {
      if (isDraggingRef.current || disabled || !isMounted()) return;

      const handle = handleRef.current;
      if (!handle) {
        throw new Error('Handle not mounted');
      }

      onMouseDown?.(evt);

      // Only accept left-clicks.
      if (isMouseEvent(evt) && !isMainClick(evt)) return;

      if (isTouch) {
        evt.preventDefault();
        focus();
      }

      const touchIdentifier = !isMouseEvent(evt) ? getTouchIdentifier(evt) : null;
      const touch =
        typeof touchIdentifier === 'number' && !isMouseEvent(evt)
          ? getTouch(evt, touchIdentifier)
          : null;

      const eventX = isMouseEvent(evt) ? evt.clientX : touch?.clientX;
      const eventY = isMouseEvent(evt) ? evt.clientY : touch?.clientY;
      const elRect = handle.getBoundingClientRect();

      touchIdentifierRef.current = touchIdentifier;
      isDraggingRef.current = true;
      // this will prevent a jump when moving
      deltaRef.current = {
        xDel: eventX ? eventX - elRect.x : 0,
        yDel: eventY ? eventY - elRect.y : 0,
      };

      // Add events to the document directly so we catch when the user's mouse/touch moves outside of
      // this element. We use different events depending on whether or not we have detected that this
      // is a touch-capable device.
      addEvent(handle.ownerDocument, isTouch ? touchEvents.move : mouseEvents.move, handleDrag);
      addEvent(handle.ownerDocument, isTouch ? touchEvents.stop : mouseEvents.stop, handleDragStop);
    },
    [
      onMouseDown,
      touchIdentifierRef,
      isMounted,
      handleRef,
      disabled,
      focus,
      handleDrag,
      handleDragStop,
    ]
  );

  useEffect(() => {
    if (!handleRef.current) return;
    /*
     * added on mount so can be added w passive = false. Allows for cancel
     * https://developers.google.com/web/updates/2017/01/scrolling-intervention
     */
    const handle = handleRef.current;
    addEvent(handle, touchEvents.start, e => handleDragStart(e, true), {
      passive: false,
    });
    // unmount
    return () => {
      if (!handle) return;
      const { ownerDocument } = handle;
      removeEvent(ownerDocument, mouseEvents.move, handleDrag);
      removeEvent(ownerDocument, touchEvents.move, handleDrag);
      removeEvent(ownerDocument, mouseEvents.stop, handleDragStop);
      removeEvent(ownerDocument, touchEvents.stop, handleDragStop);
      removeEvent(handle, touchEvents.start, (e: DragEvent) => handleDragStart(e, true));
    };
  }, [handleRef, handleDragStart, handleDrag, handleDragStop]);

  const offset = getOffset(value);
  const positionStyle = vertical
    ? { bottom: offset, top: 'auto' }
    : { left: offset, right: 'auto' };

  return (
    <button
      aria-disabled={!!disabled}
      aria-label={ariaLabel}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      aria-controls={ariaControls}
      disabled={disabled}
      onMouseDown={e => handleDragStart(e, false)}
      onMouseUp={e => handleDragStop(e, false)}
      onTouchStart={() => {
        // the pseudo selector was not working on mobile for some reason
        handleRef.current?.classList.add('active');
      }}
      onTouchEnd={e => {
        handleDragStop(e, true);
        // the pseudo selector was not working on mobile for some reason
        handleRef.current?.classList.remove('active');
      }}
      ref={handleRef}
      role="slider"
      style={positionStyle}
      className={scoppedClasses('handle', vertical && 'vertical')}
    />
  );
};

export default SliderHandle;
