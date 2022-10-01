import clsx from 'clsx';
import times from 'lodash/times';
import React, { useEffect, useMemo, useState } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { phantomButtonStyle } from '../Button/PhantomButton';
import { Option as OptionButton, Value } from '../Elements/Library/types';
import { Grid } from '../Grid';
import { BODY_FONT_FAMILY, Text } from '../Text';
import { AemikoKind, AemikoSize, CanColor, useKindTheme } from '../Theme';
import { EmSize, RemSize } from '../types';

type OptionGroupProps<V extends Value> = {
  kind?: AemikoKind;
  size?: AemikoSize;
  value?: V | null;
  options: OptionButton<V, { disabled?: boolean } | null>[];
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
          const isDisabled = Boolean(o?.data?.disabled);
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

const sizeMap: Record<AemikoSize, FlattenSimpleInterpolation> = {
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

  &:not(.disabled) {
    :hover,
    :focus {
    }
    :active {
      &:not(.selected) {
        background: ${({ themeColorer }) => themeColorer('bg:active')};
        border-color: ${({ themeColorer }) => themeColorer('bg:active')};
        color: ${({ themeColorer }) => themeColorer('text')};
      }
    }
  }

  &.disabled {
    border-color: ${({ themeColorer }) => themeColorer('bg:disabled')};
    cursor: not-allowed;
    opacity: 0.75;
  }
`;

const expandedButtonWidth: Record<AemikoSize, FlattenSimpleInterpolation> = {
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
  ${Text.linkStyle}
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
