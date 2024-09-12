import React, { useCallback, useMemo, useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';
import keyboardKey from 'keyboard-key';

import { classes, isString, scopedClasses } from '@rothko-ui/utils';

import { getElementFullHeight } from '../../library/utils/domUtils/dimensions';
import { Flex, FlexItem } from '../../layout';
import type { Icon } from './types';
import useAccordion from './useAccordion';
import type { WithAria } from '../../types';
import useId from '../../library/hooks/useId';
import AccordionIcon from './AccordionIcon';
import styles from './Accordion.module.scss';
import PhantomButton from '../../library/Button/PhantomButton';
import { debugFactory } from '../../library/debug';
import {
  AccordionDefaultBodyText,
  AccordionDefaultSubtitleText,
  AccordionDefaultTitleText,
} from '../../library/Text/Text';

const sc = scopedClasses(styles);
const debug = debugFactory('<AccordionPanel />');

type AriaAttributes = 'aria-hidden' | 'aria-label';
type StyleableComponents = 'label' | 'content';

type AccordionPanelProps = {
  id?: string;
  /**
   * The content of the AccordionPanel.
   */
  children: React.ReactNode;
  /**
   * The class name for the AccordionPanel.
   */
  className?: string;
  /**
   * The class names for the AccordionPanel components.
   */
  classNames?: Partial<Record<StyleableComponents, string>>;
  /**
   * Determines if the AccordionPanel is disabled.
   */
  disabled?: boolean;
  /**
   * The icon for the AccordionPanel.
   */
  icon?: Icon;
  /**
   * Event handler for the click event on the AccordionPanel.
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Event handler for the keydown event on the AccordionPanel.
   */
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  /**
   * The key for the AccordionPanel.
   */
  $key?: string;
  /**
   * The inline style for the AccordionPanel.
   */
  style?: React.CSSProperties;
  /**
   * The inline styles for the AccordionPanel components.
   */
  styles?: Partial<Record<StyleableComponents, React.CSSProperties>>;
  /**
   * The subtitle of the AccordionPanel.
   */
  subtitle?: React.ReactNode;
  /**
   * The title of the AccordionPanel.
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
          const code = keyboardKey.getCode(e);
          if (code === keyboardKey.Enter) {
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
        return <AccordionDefaultTitleText kind={kind}>{titleProp}</AccordionDefaultTitleText>;
      }
      return <FlexItem>{titleProp}</FlexItem>;
    }, [titleProp, kind]);

    const subtitle = useMemo(() => {
      if (!subtitleProp) {
        return null;
      }
      if (isString(subtitleProp)) {
        return (
          <AccordionDefaultSubtitleText kind={kind}>{subtitleProp}</AccordionDefaultSubtitleText>
        );
      }
      return <FlexItem>{subtitleProp}</FlexItem>;
    }, [subtitleProp, kind]);

    return (
      <div id={id} className={classes(baseContainerClasses, className)} style={style} ref={ref}>
        <header>
          <PhantomButton
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
          </PhantomButton>
        </header>
        <PanelContent
          id={contentId}
          style={stylesProp.content}
          className={classNames.content}
          isOpen={isPanelSelected}
          toggleId={toggleId}
        >
          {isString(children) ? (
            <AccordionDefaultBodyText>{children}</AccordionDefaultBodyText>
          ) : (
            <>{children}</>
          )}
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
