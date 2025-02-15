import {
  classes,
  isString,
  debugFactory,
  useId,
  ListenableKeys,
  getKeyCode,
  Flex,
  FlexItem,
  getElementFullHeight,
} from '@rothko-ui/system';
import React, { useCallback, useMemo, useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';
import AccordionIcon from './AccordionIcon';
import type { Icon } from './types';
import useAccordion from './useAccordion';
import { AccordionBodyText, AccordionSubtitleText, AccordionTitleText } from './AccordionText';
import type { WithAria, Dictionary } from '@rothko-ui/system';

const debug = debugFactory('<AccordionPanel />');

type AriaAttributes = 'aria-hidden' | 'aria-label';
type StyleableComponents = 'label' | 'content';

type AccordionPanelProps = {
  /**
   * The `id` attribute of the panel.
   * @type {string}
   */
  id?: string;
  /**
   * The content of the panel.
   * @type {React.ReactNode}
   * @required
   */
  children: React.ReactNode;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * CSS class name(s) for the panel components.
   * @type {Object<StyleableComponents, string>}
   */
  classNames?: Dictionary<StyleableComponents, string>;
  /**
   * Determines if the panel is disabled.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * The icon for the panel.
   * @type {Icon}
   */
  icon?: Icon;
  /**
   * Event handler for the click event on the panel.
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Event handler for the keydown event on the panel.
   */
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  /**
   * The key for the panel.
   * @type {string}
   */
  $key?: string;
  /**
   * The inline style for the panel.
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
  /**
   * The inline styles for the panel components.
   * @type {Object<StyleableComponents, React.CSSProperties>}
   */
  styles?: Dictionary<StyleableComponents, React.CSSProperties>;
  /**
   * The subtitle of the panel.
   * @type {React.ReactNode}
   */
  subtitle?: React.ReactNode;
  /**
   * The title of the panel.
   * @type {React.ReactNode}
   */
  title: React.ReactNode;
};

const AccordionPanel = React.forwardRef<
  HTMLDivElement,
  WithAria<AccordionPanelProps, AriaAttributes>
>(
  (
    {
      id,
      'aria-label': ariaLabel,
      'aria-hidden': ariaHidden,
      children,
      className,
      classNames = {},
      disabled,
      icon: iconOverrideLocal,
      onClick: onClickProp,
      onKeyDown: onKeyDownProp,
      $key,
      style,
      styles: stylesProp = {},
      subtitle: subtitleProp,
      title: titleProp,
    },
    ref
  ) => {
    const contentId = useId();
    const toggleId = useId();

    const { bordered, iconOverride, onClickPanel, selectedPanels, compact } = useAccordion();

    const containerClassNames = classes(
      'bg-(--rothko-accordion-background)',
      'border',
      'border-solid',
      'border-(--rothko-accordion-background)',
      !compact && 'rounded-xs', // 0.125rem
      // == bordered ==
      bordered && 'border-(--rothko-accordion-border)', // TODO: decide if we still want this?
      // == compact ==
      compact && 'rounded-none',
      compact && 'last:rounded-bl-xs', // 0.125rem
      compact && 'last:rounded-br-xs', // 0.125rem
      compact && 'first:rounded-tl-xs', // 0.125rem
      compact && 'first:rounded-tr-xs', // 0.125rem
      compact && 'not:last:border-b-0', // border-bottom: 0
      // == disabled ==
      disabled && 'pointer-events-none',
      disabled && 'cursor-not-allowed',
      disabled && 'opacity-50',
      // == text classes for children to inherit ==
      'rothko-color-body',
      'rothko-font-regular',
      'rothko-paragraph-size-default',
      className
    );

    const labelClassNames = classes(
      'ios-tap-highlight-color-transparent',
      'select-none',
      'flex',
      'items-center',
      'gap-2', // 0.5rem
      'w-full', // 100%
      'py-4', // 1rem (same as content)
      'px-3.5', // 0.875rem (same as content)
      'cursor-pointer',
      'focus-visible:outline',
      'focus-visible:outline-(--rothko-accordion-border)',
      classNames.label
    );

    const panelKey = useId($key);
    const isPanelSelected = selectedPanels.includes(panelKey);

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        debug('onKeydown', { panelKey });
        if (!disabled) {
          const code = getKeyCode(e);
          if (code === ListenableKeys.Enter) {
            e.preventDefault();
            onKeyDownProp?.(e);
            onClickPanel(panelKey);
          }
        }
      },
      [onClickPanel, onKeyDownProp, panelKey, disabled]
    );

    const onClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        debug('onClick', { panelKey });
        if (!disabled) {
          onClickProp?.(e);
          onClickPanel(panelKey);
        }
      },
      [onClickPanel, onClickProp, panelKey, disabled]
    );

    const title = useMemo(() => {
      if (!titleProp) {
        return null;
      }
      if (isString(titleProp)) {
        return <AccordionTitleText>{titleProp}</AccordionTitleText>;
      }
      return <FlexItem>{titleProp}</FlexItem>;
    }, [titleProp]);

    const subtitle = useMemo(() => {
      if (!subtitleProp) {
        return null;
      }
      if (isString(subtitleProp)) {
        return <AccordionSubtitleText>{subtitleProp}</AccordionSubtitleText>;
      }
      return <FlexItem>{subtitleProp}</FlexItem>;
    }, [subtitleProp]);

    return (
      <div id={id} className={containerClassNames} style={style} ref={ref}>
        <header>
          <button
            id={toggleId}
            aria-controls={contentId}
            aria-disabled={disabled}
            aria-expanded={isPanelSelected}
            aria-hidden={ariaHidden}
            aria-label={ariaLabel}
            aria-selected={isPanelSelected}
            className={labelClassNames}
            disabled={disabled}
            onClick={onClick}
            onKeyDown={onKeyDown}
            role="tab"
            style={stylesProp.label}
            tabIndex={disabled ? -1 : 0}
            type="button"
          >
            <AccordionIcon
              open={isPanelSelected}
              disabled={!!disabled}
              iconOverride={iconOverrideLocal || iconOverride}
            />
            {(title || subtitle) && (
              <Flex flexDirection="column" rowGap="0.1rem" alignItems="start">
                {title}
                {subtitle}
              </Flex>
            )}
          </button>
        </header>
        <AccordionPanelContent
          id={contentId}
          style={stylesProp.content}
          className={classNames.content}
          isOpen={isPanelSelected}
          toggleId={toggleId}
        >
          {isString(children) ? <AccordionBodyText>{children}</AccordionBodyText> : <>{children}</>}
        </AccordionPanelContent>
      </div>
    );
  }
);

AccordionPanel.displayName = 'AccordionPanel';

type AccordionPanelContentProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  isOpen?: boolean;
  style?: React.CSSProperties;
  toggleId: string;
};

const AccordionPanelContent = ({
  children,
  className,
  style,
  isOpen,
  id,
  toggleId,
}: AccordionPanelContentProps) => {
  const panelContentClasses = classes(
    'pt-0', // 0rem
    'px-3.5', // 0.875rem
    'pb-4', // 1rem
    className
  );

  const contentRef = useRef<HTMLDivElement | null>(null);

  const springStyle = useSpring({
    to: async next => {
      if (isOpen) {
        const contentHeight = getElementFullHeight(contentRef.current);
        await next({ visibility: 'visible', immediate: true });
        await next({ height: contentHeight, opacity: 1 });
        await next({ overflow: 'visible' });
      } else {
        await next({ opacity: 1, overflow: 'hidden', immediate: true });
        await next({ height: 0, opacity: 0 });
        await next({ visibility: 'hidden' });
      }
    },
    from: isOpen
      ? ({
          height: 'initial',
          opacity: 1,
          overflow: 'visible',
          visibility: 'visible',
        } as const)
      : ({
          height: 0,
          opacity: 0,
          overflow: 'hidden',
          visibility: 'hidden',
        } as const),
  });

  return (
    <animated.section id={id} role="tabpanel" aria-labelledby={toggleId} style={springStyle}>
      <div style={style} className={panelContentClasses} ref={contentRef}>
        {children}
      </div>
    </animated.section>
  );
};

export default AccordionPanel;
