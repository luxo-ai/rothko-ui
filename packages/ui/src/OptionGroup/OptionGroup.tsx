import clsx from 'clsx';
import times from 'lodash/times';
import React, { useEffect, useMemo, useState } from 'react';
import type { FlattenSimpleInterpolation } from 'styled-components';
import styled, { css } from 'styled-components';
import { phantomButtonStyle } from '../Button/PhantomButton';
import type { Option, Value } from '../Library/types';
import Grid from '../Grid/Grid';
import Typography, { BODY_FONT_FAMILY } from '../Typography';
import type { RothkoKind, RothkoSize, CanColor } from '../Theme';
import { useKindTheme } from '../Theme';
import type { EmSize, RemSize } from '../types';

type OptionGroupProps<V extends Value> = {
  kind?: RothkoKind;
  size?: RothkoSize;
  value?: V | null;
  options: Option<V, { disabled?: boolean } | undefined>[];
  onChange: (id: V) => void;
  onExpand?: () => void;
  maxCol?: number;
  maxRow?: number;
  children?: React.ReactNode;
  fillRemainingSpace?: boolean;
  optionsWithRadius?: boolean;
  optionGap?: RemSize | EmSize | number;
} & Pick<React.HTMLProps<HTMLDivElement>, 'style' | 'className' | 'id'>;

export function OptionGroup<V extends Value>({
  id,
  kind = 'primary',
  size = 'm',
  options,
  onChange,
  maxCol = 4,
  maxRow,
  children,
  onExpand,
  value,
  className,
  fillRemainingSpace,
  optionsWithRadius = true,
  optionGap = '0.5rem',
  style,
}: OptionGroupProps<V>) {
  const [expanded, setExpanded] = useState(false);
  const [themeColorer] = useKindTheme(kind);

  const maxOptions = Math.min(options.length, maxRow ? maxRow * maxCol : Infinity);

  const displayableOptions = useMemo(() => {
    if (expanded) return options;
    return maxOptions < options.length ? options.slice(0, maxOptions) : options;
  }, [expanded, options, maxOptions]);

  useEffect(() => {
    if (expanded) onExpand?.();
  }, [expanded]);

  const remainingSpace = (maxCol - (displayableOptions.length % maxCol)) % maxCol;

  return (
    <OptionGroupContainer id={id} style={style} className={className}>
      <Grid flexGrow={1} gridTemplateColumns={`repeat(${maxCol}, 1fr)`} gap={optionGap}>
        {displayableOptions.map(o => {
          const isDisabled = 'data' in o && Boolean(o?.data?.disabled);
          const isSelected = o.id === value;

          const classObj = {
            disabled: isDisabled,
            selected: isSelected,
            ['with-radius']: optionsWithRadius,
          } as const;

          return (
            <OptionButton
              key={o.id}
              onClick={isDisabled ? undefined : () => onChange(o.id)}
              themeColorer={themeColorer}
              className={clsx(classObj, `opt-size-${size}`)}
              role="option"
            >
              {o.label}
            </OptionButton>
          );
        })}
        {fillRemainingSpace &&
          remainingSpace > 0 &&
          times(remainingSpace).map(i => (
            <div key={`opt-group-blank-${i}`} id={`opt-group-blank-${i}`} />
          ))}
        {children}
      </Grid>
      {maxOptions < options.length && (
        <ExpandButtonLink
          onClick={() => setExpanded(e => !e)}
          className={`expand-button-size-${size} expand-button-width-${size}`}
        >
          {expanded ? '- less' : '+ more'}
        </ExpandButtonLink>
      )}
    </OptionGroupContainer>
  );
}

const sizeMap: Record<RothkoSize, FlattenSimpleInterpolation> = {
  xs: css`
    padding: 0.25rem 0.4rem;
    font-size: 0.75rem;
  `,
  s: css`
    padding: 0.3rem 0.5rem;
    font-size: 0.85rem;
  `,
  m: css`
    padding: 0.75rem 0.75rem;
    font-size: 1rem;
  `,
  l: css`
    padding: 0.625rem 0.94rem;
    font-size: 1.25rem;
  `,
  xl: css`
    padding: 1rem 1.3rem;
    font-size: 1.75rem;
  `,
};

const OptionGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const OptionButton = styled.button.attrs({ as: 'button' })<CanColor>`
  -webkit-tap-highlight-color: transparent;
  ${phantomButtonStyle}
  font-family: ${BODY_FONT_FAMILY.regular};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  border: 0.125rem solid ${({ themeColorer }) => themeColorer()};
  user-select: none;

  // fix later to work with theming
  background: #ffffff;
  color: ${({ themeColorer }) => themeColorer()};

  &.selected {
    background: ${({ themeColorer }) => themeColorer()};
    color: ${({ themeColorer }) => themeColorer('text')};
  }

  &.with-radius {
    border-radius: 0.125rem; // 2px
  }

  ${Object.entries(sizeMap).map(
    ([key, value]) => css`
      &.opt-size-${key} {
        ${value}
      }
    `
  )}

  &.disabled {
    border-color: ${({ themeColorer }) => themeColorer('bg:disabled')};
    cursor: not-allowed;
    opacity: 0.75;
  }
`;

const expandedButtonWidth: Record<RothkoSize, FlattenSimpleInterpolation> = {
  xs: css`
    width: 50px; // rem
  `,
  s: css`
    width: 58px; // rem
  `,
  m: css`
    width: 73px; // rem
  `,
  l: css`
    width: 91.4px; // rem
  `,
  xl: css`
    width: 127.41px; // rem
  `,
};

const ExpandButtonLink = styled.a`
  -webkit-tap-highlight-color: transparent;
  ${Typography.linkStyle}
  height: fit-content;
  ${Object.entries(sizeMap).map(
    ([key, value]) => css`
      &.expand-button-size-${key} {
        ${value}
      }
    `
  )}
  ${Object.entries(expandedButtonWidth).map(
    ([key, value]) => css`
      &.expand-button-width-${key} {
        ${value}
      }
    `
  )}
`;
