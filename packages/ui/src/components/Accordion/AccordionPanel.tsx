import React, { useCallback, useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';
import keyboardKey from 'keyboard-key';

import { classes, isString, scopedClasses as sc } from '@rothko-ui/utils';

import type { RothkoKind } from '../../theme';
import { getElementFullHeight } from '../../library/utils/domUtils/dimensions';
import Typography from '../Typography/Typography';
import { Flex, FlexItem } from '../../layout';
import type { Icon } from './types';
import useAccordion from './useAccordion';
import { useDebuggerContext } from '../../library/DebuggerContext';
import type { WithAriaHidden, WithAriaLabel, WithAriaLabelledBy } from '../../types';
import useId from '../../library/hooks/useId';
import AccordionIcon from './AccordionIcon';
import styles from './Accordion.module.scss';

const scoppedClasses = sc(styles);

type WithAria<T> = WithAriaHidden<WithAriaLabel<T>>;

type AccordionPanelProps = WithAria<{
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
   * The class name for the content of the AccordionPanel.
   */
  contentClassName?: string;
  /**
   * The inline style for the content of the AccordionPanel.
   */
  contentStyle?: React.CSSProperties;
  /**
   * Determines if the AccordionPanel is disabled.
   */
  disabled?: boolean;
  /**
   * The icon for the AccordionPanel.
   */
  icon?: Icon;
  /**
   * The class name for the label of the AccordionPanel.
   */
  labelClassName?: string;
  /**
   * The inline style for the label of the AccordionPanel.
   */
  labelStyle?: React.CSSProperties;
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
   * The subtitle of the AccordionPanel.
   */
  subtitle?: React.ReactNode;
  /**
   * The title of the AccordionPanel.
   */
  title: React.ReactNode;
}>;

const AccordionPanel = React.forwardRef<HTMLDivElement, AccordionPanelProps>(
  (
    {
      id,
      'aria-label': ariaLabel,
      'aria-hidden': ariaHidden,
      children,
      className,
      contentClassName,
      contentStyle,
      disabled,
      icon: iconOverrideLocal,
      labelClassName,
      labelStyle,
      onClick: onClickProp,
      onKeyDown: onKeyDownProp,
      $key,
      style,
      subtitle,
      title,
    },
    ref
  ) => {
    const contentId = useId();
    const toggleId = useId();

    const debug = useDebuggerContext('<AccordionPanel />');

    const { bordered, iconOverride, kind, onClickPanel, selectedPanels, compact, hideIcon } =
      useAccordion();

    const baseContainerClasses = scoppedClasses(
      'accordion__panel',
      kind && `accordion__panel--${kind}`,
      compact && 'compact',
      disabled && 'disabled',
      bordered && 'bordered'
    );

    const baseLabelClasses = scoppedClasses('accordion__panel__label', disabled && 'disabled');

    const panelKey = useId($key);
    const isPanelSelected = selectedPanels.includes(panelKey);

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        debug('onKeydown');
        const code = keyboardKey.getCode(e);
        if (code === keyboardKey.Enter) {
          e.preventDefault();
          if (!disabled) {
            onKeyDownProp?.(e);
            onClickPanel(panelKey);
          }
        }
      },
      [onClickPanel, onKeyDownProp, panelKey, disabled, debug]
    );

    const onClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
          onClickProp?.(e);
          onClickPanel(panelKey);
        }
      },
      [onClickPanel, onClickProp, panelKey, disabled]
    );

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
            className={classes(baseLabelClasses, labelClassName)}
            disabled={disabled}
            onClick={onClick}
            onKeyDown={onKeyDown}
            role="tab"
            style={labelStyle}
            tabIndex={disabled ? -1 : 0}
            type="button"
          >
            {!hideIcon && (
              <AccordionIcon
                open={isPanelSelected}
                disabled={!!disabled}
                kind={kind}
                iconOverride={iconOverrideLocal || iconOverride}
              />
            )}
            <Flex flexDirection="column" rowGap="0.1rem" alignItems="start">
              {isString(title) ? (
                <DefaultTitleText kind={kind}>{title}</DefaultTitleText>
              ) : (
                <FlexItem>{title}</FlexItem>
              )}
              {isString(subtitle) ? (
                <DefaultSubtitleText kind={kind}>{subtitle}</DefaultSubtitleText>
              ) : (
                <FlexItem>{subtitle}</FlexItem>
              )}
            </Flex>
          </button>
        </header>
        <PanelContent
          id={contentId}
          style={contentStyle}
          className={contentClassName}
          isOpen={isPanelSelected}
          aria-labelledby={toggleId}
        >
          {isString(children) ? <DefaultBodyText>{children}</DefaultBodyText> : <>{children}</>}
        </PanelContent>
      </div>
    );
  }
);

AccordionPanel.displayName = 'AccordionPanel';

type PanelContentProps = WithAriaLabelledBy<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  isOpen?: boolean;
  style?: React.CSSProperties;
}>;

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

const PanelContent = ({
  children,
  className,
  style,
  isOpen,
  id,
  'aria-labelledby': ariaLabelledBy,
}: PanelContentProps) => {
  const baseContentClasses = scoppedClasses('accordion__panel__content');

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
    <animated.section id={id} role="tabpanel" aria-labelledby={ariaLabelledBy} style={springStyle}>
      <div style={style} className={classes(baseContentClasses, className)} ref={contentRef}>
        {children}
      </div>
    </animated.section>
  );
};

const DefaultBodyText = ({ children }: { children: React.ReactNode }) => {
  return <Typography.body className={styles['accordion__text']}>{children}</Typography.body>;
};

const DefaultTitleText = ({ children, kind }: { children: React.ReactNode; kind?: RothkoKind }) => {
  return (
    <Typography.body bold className={styles['accordion__text']} kind={kind}>
      {children}
    </Typography.body>
  );
};

const DefaultSubtitleText = ({
  children,
  kind,
}: {
  children: React.ReactNode;
  kind?: RothkoKind;
}) => {
  return (
    <Typography.bodySmall
      light
      kind={kind}
      style={{ opacity: 0.8 }}
      className={styles['accordion__text']}
    >
      {children}
    </Typography.bodySmall>
  );
};

export default AccordionPanel;
