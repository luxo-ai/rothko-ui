import React, { useCallback, useRef } from 'react';
import { animated, useSpring } from '@react-spring/web';
import styled, { css } from 'styled-components';
import keyboardKey from 'keyboard-key';

import { phantomButtonStyle } from '../../library/PhantomButton';
import { unselectableStyle } from '../../library/Styles';
import type { KindProps } from '../../theme';
import { getElementFullHeight } from '../../library/utils/domUtils/dimensions';
import Typography from '../Typography/Typography';
import AccordionIcon from './AccordionIcon';
import { Flex, FlexItem } from '../../layout';
import type { IconOverride } from './types';
import useAccordion from './useAccordion';
import { useDebuggerContext } from '../../library/DebuggerContext';
import type { WithAriaHidden, WithAriaLabel, WithAriaLabelledBy } from '../../types';
import useId from '../../library/hooks/useId';

// TODO make thhe padding a variable

type AccordionPanelProps = WithAriaHidden<
  WithAriaLabel<{
    id?: string;
    /** Content of the accordion panel, required. */
    children: React.ReactNode;
    /** CSS class for custom styling of the panel container. */
    className?: string;
    /** CSS class for custom styling of the panel content area. */
    contentClassName?: string;
    /** Inline styles for the panel content area. */
    contentStyle?: React.CSSProperties;
    /** If `true`, the panel is disabled and cannot be interacted with. */
    disabled?: boolean;
    /** Custom icons for the accordion state indicators, overriding default icons. */
    iconOverride?: IconOverride;
    /** CSS class for custom styling of the panel label. */
    labelClassName?: string;
    /** Inline styles for the panel label. */
    labelStyle?: React.CSSProperties;
    /** Callback function triggered on click events. */
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    /** Callback function triggered on keydown events. */
    onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
    /** Unique key for identifying the panel, necessary for managing open state in a collection. */
    $key?: string;
    /** Inline styles for the panel container. */
    style?: React.CSSProperties;
    /** Subtitle content for the panel, can be a string or JSX element. */
    subtitle?: string | JSX.Element;
    /** Title content for the panel, required, can be a string or JSX element. */
    title: string | JSX.Element;
  }>
>;

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
      iconOverride: iconOverrideLocal,
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

    const { bordered, iconOverride, kind, onClickPanel, selectedPanels, compact, withIcon } =
      useAccordion();

    const panelKey = useId($key);
    const isPanelSelected = selectedPanels.has(panelKey);

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
      <PanelContainerDiv
        id={id}
        $spaced={!compact}
        $bordered={bordered}
        $disabled={disabled}
        kind={kind}
        className={className}
        style={style}
        ref={ref}
      >
        <header>
          <PanelLabelButton
            id={toggleId}
            $disabled={disabled}
            aria-controls={contentId}
            aria-disabled={disabled}
            aria-expanded={isPanelSelected}
            aria-hidden={ariaHidden}
            aria-label={ariaLabel}
            aria-selected={isPanelSelected}
            className={labelClassName}
            disabled={disabled}
            onClick={onClick}
            onKeyDown={onKeyDown}
            role="tab"
            style={labelStyle}
            tabIndex={disabled ? -1 : 0}
            type="button"
          >
            {withIcon && (
              <AccordionIcon
                open={isPanelSelected}
                disabled={!!disabled}
                kind={kind}
                iconOverride={iconOverrideLocal || iconOverride}
              />
            )}
            <Flex flexDirection="column" rowGap="0.1rem" alignItems="start">
              {typeof title === 'string' ? (
                <DefaultTitleText kind={kind}>{title}</DefaultTitleText>
              ) : (
                <FlexItem>{title}</FlexItem>
              )}
              {typeof subtitle === 'string' ? (
                <DefaultSubtitleText kind={kind}>{subtitle}</DefaultSubtitleText>
              ) : (
                <FlexItem>{subtitle}</FlexItem>
              )}
            </Flex>
          </PanelLabelButton>
        </header>
        <PanelContent
          id={contentId}
          style={contentStyle}
          className={contentClassName}
          isOpen={isPanelSelected}
          aria-labelledby={toggleId}
        >
          {typeof children === 'string' ? (
            <DefaultBodyText>{children}</DefaultBodyText>
          ) : (
            <>{children}</>
          )}
        </PanelContent>
      </PanelContainerDiv>
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
    <animated.section
      id={id}
      role="tabpanel" // for accordion content
      aria-labelledby={ariaLabelledBy}
      style={springStyle}
    >
      <PanelContentDiv style={style} className={className} ref={contentRef}>
        {children}
      </PanelContentDiv>
    </animated.section>
  );
};

type PanelContainerDivProps = KindProps & {
  $bordered?: boolean;
  $spaced?: boolean;
  $disabled?: boolean;
};

const PanelContainerDiv = styled.div<PanelContainerDivProps>`
  // overflow: hidden; do we need this? (messes with the onFous outline)
  background: var(--rothko-accordion-background, #fff);

  // padding: 0 0.875rem;
  border-radius: 0.125rem;

  border: 1px solid var(--rothko-accordion-background, #fff);

  ${({ $bordered, kind }) =>
    $bordered &&
    css`
      background: var(--rothko-background, transparent);
      border: 1px solid ${kind ? `var(--rothko-${kind}-500, #000)` : 'var(--rothko-border, #000)'};
    `}

  ${({ $spaced }) =>
    $spaced
      ? css`
          border-radius: 0.125rem;
        `
      : css`
          border-radius: 0;
          &:last-of-type {
            border-bottom-left-radius: 0.125rem;
            border-bottom-right-radius: 0.125rem;
          }
          &:first-of-type {
            border-top-left-radius: 0.125rem;
            border-top-right-radius: 0.125rem;
          }
          &:not(:last-of-type) {
            border-bottom: none;
          }
        `}

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;

const PanelLabelButton = styled.button<{ $disabled?: boolean }>`
  ${unselectableStyle}
  ${phantomButtonStyle}
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.875rem;

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  // https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
  &:focus-visible {
    // --rothko-foucs doesn't exist yet
    outline: 1px solid var(--rothko-focus, #000);
  }
`;

const PanelContentDiv = styled.div`
  padding: 0 0.875rem 0.875rem;
`;

const DefaultBodyText = styled(Typography.body)`
  margin: 0;
  padding: 0;
`;

const DefaultTitleText = styled(Typography.body).attrs({ bold: true })`
  margin: 0;
  padding: 0;
`;

const DefaultSubtitleText = styled(Typography.bodySmall).attrs({ light: true })`
  margin: 0;
  padding: 0;
  opacity: 0.8;
`;

export default AccordionPanel;
