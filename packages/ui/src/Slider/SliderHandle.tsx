import type { Nullable } from '@rothko-ui/utils';
import { useIsMounted } from '@rothko-ui/utils';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import type { AemikoKind, CanColor, ThemedElement } from '../Theme';
import { useKindTheme } from '../Theme';
import type { DragDelta, DragEvent } from '../utils/domUtils';
import {
  addEvent,
  calculateXYDragPosn,
  getTouch,
  getTouchIdentifier,
  isMainClick,
  isMouseEvent,
  removeEvent,
} from '../utils/domUtils';
import { getOffsetFactory } from './sliderUtils';

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

type SliderHandleProps = Pick<
  React.HTMLProps<HTMLButtonElement>,
  'id' | 'style' | 'className' | 'tabIndex'
> & {
  onChange: (v: number) => void;
  onDrag?: (e: DragEvent) => void;
  onMouseDown?: (e: DragEvent) => void;
  kind?: AemikoKind;
  vertical?: boolean;
  disabled?: boolean;
  value: number;
  min?: number;
  max: number;
  ariaLabel?: string;
};

export const SliderHandle = ({
  id,
  style,
  className,
  tabIndex,
  disabled,
  vertical,
  value,
  min = 0,
  max,
  ariaLabel,
  kind = 'primary',
  onDrag,
  onMouseDown,
  onChange,
}: SliderHandleProps) => {
  const isMounted = useIsMounted();
  const [colorer, theme] = useKindTheme(kind);

  const handleRef = useRef<HTMLButtonElement | null>(null);
  const onChangeRef = useRef(onChange);
  const isDraggingRef = useRef<boolean>(false);
  const touchIdentifierRef = useRef<Nullable<number>>(null);
  const deltaRef = useRef<DragDelta>({ xDel: 0, yDel: 0 });

  const getOffset = useCallback(getOffsetFactory({ min, max }), [min, max]);

  /*
   * Awful hack in order to get updates to "onChange" to reflect in the drag handlers.
   * See the MultiSlider component for an example of the type of updates
   */
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const focus = () => {
    handleRef.current?.focus();
  };

  const blur = () => {
    handleRef.current?.blur();
  };

  useEffect(() => {
    if (!handleRef.current) return;
    /*
     * added on mount so can be added w passive = false. Allows for cancel
     * https://developers.google.com/web/updates/2017/01/scrolling-intervention
     */
    addEvent(handleRef.current, touchEvents.start, e => handleDragStart(e, true), {
      passive: false,
    });
    // unmount
    return () => {
      if (!handleRef.current) return;
      const { ownerDocument } = handleRef.current;
      removeEvent(ownerDocument, mouseEvents.move, handleDrag);
      removeEvent(ownerDocument, touchEvents.move, handleDrag);
      removeEvent(ownerDocument, mouseEvents.stop, handleDragStop);
      removeEvent(ownerDocument, touchEvents.stop, handleDragStop);
      removeEvent(handleRef.current, touchEvents.start, (e: DragEvent) => handleDragStart(e, true));
    };
  }, [handleRef]);

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
    [onMouseDown, touchIdentifierRef, isMounted, handleRef, disabled]
  );

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
    [touchIdentifierRef, isDraggingRef, handleRef, onChangeRef, onDrag]
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
    [handleRef, isDraggingRef]
  );

  /*
  const buttonStyle = getInlineCSSTranslation({
    x: vertical ? 0 : position,
    y: vertical ? position : 0,
  });
  */

  const offset = getOffset(value);
  const positionStyle = vertical
    ? { bottom: offset, top: 'auto' }
    : { left: offset, right: 'auto' };

  const elStyle = {
    ...style,
    ...positionStyle,
  };

  return (
    <HandleButton
      id={id}
      ref={handleRef}
      style={elStyle}
      tabIndex={tabIndex}
      className={className}
      disabled={disabled}
      role="slider"
      onMouseDown={e => handleDragStart(e, false)}
      onMouseUp={e => handleDragStop(e, false)}
      onTouchStart={_ => {
        // the pseudo selector was not working on mobile for some reason
        handleRef.current?.classList.add('active');
      }}
      onTouchEnd={e => {
        handleDragStop(e, true);
        // the pseudo selector was not working on mobile for some reason
        handleRef.current?.classList.remove('active');
      }}
      vertical={vertical}
      aemikoTheme={theme}
      themeColorer={colorer}
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={!!disabled}
    />
  );
};

const HandleButton = styled.button.attrs({ type: 'button' })<
  ThemedElement & CanColor & { vertical?: boolean }
>`
  // https://stackoverflow.com/questions/30552307/ios-safari-buttons-not-perfect-circles
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  transform: ${({ vertical }) => (vertical ? `translate(0%, -50%)` : `translate(-50%, 0%)`)};
  background-color: white;
  transition-property: border;
  transition-duration: 0.2s;
  box-shadow: 0 2px 6px 0 rgb(101 110 123 / 20%);
  border-radius: 50%;
  border-style: solid;
  border-width: 1px;
  border-color: ${({ aemikoTheme }) => aemikoTheme['basic-500']};
  overflow: visible;
  touch-action: ${({ vertical }) => (vertical ? `pan-y` : `pan-x`)};
  z-index: 3;
  user-select: none;

  &:not(:disabled) {
    &:hover,
    &:active,
    &.active {
      border-color: ${({ themeColorer }) => themeColorer()};
    }
  }
  :disabled {
    opacity: 0.8;
    &:hover {
      cursor: not-allowed;
    }
  }
`;
