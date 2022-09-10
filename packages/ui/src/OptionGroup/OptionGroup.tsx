import clsx from 'clsx';
import times from 'lodash/times';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Grid } from '../Grid';
import { BODY_FONT_FAMILY, Text } from '../Text';
import { AemikoKind, AemikoSize, CanColor, useKindTheme } from '../Theme';
import { Option, Value } from '../Elements/Library/types';

type OptionGroupProps<V extends Value> = {
  kind?: AemikoKind;
  size?: AemikoSize;
  value?: V | null;
  options: Option<V, { disabled?: boolean }>[];
  onChange: (id: V) => void;
  onSelect?: (id: V) => void;
  onExpand?: () => void;
  maxCol?: number;
  maxRow?: number;
  children?: React.ReactNode;
  fillRemainingSpace?: boolean;
} & Pick<React.HTMLProps<HTMLDivElement>, 'style' | 'className' | 'id'>;

export function OptionGroup<V extends Value>({
  kind = 'primary',
  size = 'm',
  options,
  onChange,
  onSelect,
  maxCol = 4,
  maxRow,
  children,
  onExpand,
  value,
  className,
  fillRemainingSpace,
  style,
  id,
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

  const selectOne = useCallback(
    (id: V) => {
      onChange(id);
      onSelect?.(id);
    },
    [onChange, onSelect]
  );

  const remainingSpace = (maxCol - (displayableOptions.length % maxCol)) % maxCol;

  return (
    <div id={id} style={style} className={clsx('flex flex-row', className)}>
      <Grid gridTemplateColumns={`repeat(${maxCol}, 1fr)`} gap="0.75rem">
        {displayableOptions.map(o => {
          const isDisabled = o.data?.disabled;
          const isSelected = o.id === value;
          const classObj = { disabled: isDisabled, selected: isSelected } as const;
          return (
            <Option
              onClick={isDisabled ? undefined : () => selectOne(o.id)}
              themeColorer={themeColorer}
              key={o.id}
              className={clsx(classObj, `opt-size-${size}`)}
              role="option"
            >
              {o.label}
            </Option>
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
        <ExpandButtonLink onClick={() => setExpanded(e => !e)} className={`text-size-${size} ml2`}>
          {expanded ? '- less' : '+ more'}
        </ExpandButtonLink>
      )}
    </div>
  );
}

const sizeMap: Record<AemikoSize, FlattenSimpleInterpolation> = {
  xs: css`
    padding: 0.3rem 0.5rem;
    font-size: 0.85rem;
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

const ExpandButtonLink = styled.a<Text.LinkButtonProps>`
  ${Text.linkStyle}
  ${Object.entries(sizeMap).map(
    ([key, value]) => css`
      &.text-size-${key} {
        ${value}
      }
    `
  )}
`;

const Option = styled.div<CanColor>`
  width: 100%;
  font-family: ${BODY_FONT_FAMILY.regular};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  border: 0.125rem solid ${({ themeColorer }) => themeColorer()};
  border-radius: 0.25rem;
  user-select: none;

  // fix later to work with theming
  background: #ffffff;
  color: ${({ themeColorer }) => themeColorer()};

  &.selected {
    background: ${({ themeColorer }) => themeColorer()};
    color: ${({ themeColorer }) => themeColorer('text')};
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
