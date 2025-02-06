import { animated, useSpring } from '@react-spring/web';
import {
  classes,
  isString,
  scopedClasses,
  debugFactory,
  PhantomButton,
  useId,
  getElementFullHeight,
  ListenableKeys,
  getKeyCode,
  Flex,
  FlexItem,
} from '@rothko-ui/system';
import React, { useCallback, useMemo, useRef } from 'react';

import styles from './Accordion.module.scss';
import AccordionIcon from './AccordionIcon';
import type { Icon } from './types';
import useAccordion from './useAccordion';
import { AccordionBodyText, AccordionSubtitleText, AccordionTitleText } from './AccordionText';
import type { WithAria, Dictionary } from '@rothko-ui/system';

const sc = scopedClasses(styles);
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

    const { bordered, iconOverride, kind, onClickPanel, selectedPanels, compact } = useAccordion();

    const baseContainerClasses = sc(
      'accordion__panel',
      kind && kind,
      compact && 'compact',
      disabled && 'disabled',
      bordered && 'bordered'
    );

    const baseLabelClasses = sc('accordion__panel__label', disabled && 'disabled');

    const panelKey = useId($key);
    const isPanelSelected = selectedPanels.includes(panelKey);

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        debug('onKeydown', { disabled });
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
        debug('onClick', { disabled });
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
        return <AccordionTitleText kind={kind}>{titleProp}</AccordionTitleText>;
      }
      return <FlexItem>{titleProp}</FlexItem>;
    }, [titleProp, kind]);

    const subtitle = useMemo(() => {
      if (!subtitleProp) {
        return null;
      }
      if (isString(subtitleProp)) {
        return <AccordionSubtitleText kind={kind}>{subtitleProp}</AccordionSubtitleText>;
      }
      return <FlexItem>{subtitleProp}</FlexItem>;
    }, [subtitleProp, kind]);

    return (
      <div id={id} className={classes(baseContainerClasses, className)} style={style} ref={ref}>
        <header>
          <button
            id={toggleId}
            aria-controls={contentId}
            aria-disabled={disabled}
            aria-expanded={isPanelSelected}
            aria-hidden={ariaHidden}
            aria-label={ariaLabel}
            aria-selected={isPanelSelected}
            className={classes(baseLabelClasses, classNames.label)}
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
              kind={kind}
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
        <PanelContent
          id={contentId}
          style={stylesProp.content}
          className={classNames.content}
          isOpen={isPanelSelected}
          toggleId={toggleId}
        >
          {isString(children) ? <AccordionBodyText>{children}</AccordionBodyText> : <>{children}</>}
        </PanelContent>
      </div>
    );
  }
);

AccordionPanel.displayName = 'AccordionPanel';

const getDefaultOpenStyle = (): React.CSSProperties => ({
  height: 'initial',
  opacity: 'initial',
  overflow: 'initial',
  visibility: 'initial',
});

const getDefaultClosedStyle = (): React.CSSProperties => ({
  height: 0,
  opacity: 0,
  overflow: 'hidden',
  visibility: 'hidden',
});

type PanelContentProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  isOpen?: boolean;
  style?: React.CSSProperties;
  toggleId: string;
};

const PanelContent = ({ children, className, style, isOpen, id, toggleId }: PanelContentProps) => {
  const baseContentClasses = sc('accordion__panel__content');
  const contentRef = useRef<HTMLDivElement | null>(null);

  const springStyle = useSpring({
    to: async next => {
      if (isOpen) {
        const contentHeight = getElementFullHeight(contentRef.current);
        await next({ overflow: 'hidden', visibility: 'initial', immediate: true });
        await next({ height: contentHeight, opacity: 1 });
        await next(getDefaultOpenStyle());
      } else {
        await next({ opacity: 1, overflow: 'hidden', immediate: true });
        await next({ height: 0, opacity: 0 });
        await next(getDefaultClosedStyle());
      }
    },
    from: isOpen ? getDefaultOpenStyle() : getDefaultClosedStyle(),
  });

  return (
    <animated.section id={id} role="tabpanel" aria-labelledby={toggleId} style={springStyle}>
      <div style={style} className={classes(baseContentClasses, className)} ref={contentRef}>
        {children}
      </div>
    </animated.section>
  );
};

export default AccordionPanel;
