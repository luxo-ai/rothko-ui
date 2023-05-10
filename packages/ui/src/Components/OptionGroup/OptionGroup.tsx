import clsx from 'clsx';
import times from 'lodash/times';
import React, { useEffect, useMemo, useState } from 'react';
import type { FlattenSimpleInterpolation } from 'styled-components';
import styled, { css } from 'styled-components';
import Grid from '../../Layout/Grid/Grid';
import { phantomButtonStyle } from '../../Library/PhantomButton';
import type { Option, Value } from '../../Library/types';
import type { KindProps, RothkoSize } from '../../Theme';
import type { EmSize, RemSize } from '../../types';
import Typography from '../Typography/Typography';

type OptionGroupProps<V extends Value> = KindProps & {
  children?: React.ReactNode;
  className?: string;
  fillRemainingSpace?: boolean;
  id?: string;
  maxCol?: number;
  maxRow?: number;
  onChange: (id: V) => void;
  onExpand?: () => void;
  optionGap?: RemSize | EmSize | number;
  options: Option<V, { disabled?: boolean } | undefined>[];
  optionsWithRadius?: boolean;
  size?: RothkoSize;
  style?: React.CSSProperties;
  value?: V | null;
};

function OptionGroup<V extends Value>({
  children,
  className,
  fillRemainingSpace,
  id,
  kind = 'info',
  maxCol = 4,
  maxRow,
  onChange,
  onExpand,
  optionGap = '0.5rem',
  options,
  optionsWithRadius = true,
  size = 'm',
  style,
  value,
}: OptionGroupProps<V>) {
  const [expanded, setExpanded] = useState(false);

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

          const classes = {
            disabled: isDisabled,
            selected: isSelected,
            ['with-radius']: optionsWithRadius,
          } as const;

          return (
            <OptionButton
              className={clsx(classes, `opt-size-${size}`)}
              key={o.id}
              kind={kind}
              onClick={isDisabled ? undefined : () => onChange(o.id)}
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

const OptionButton = styled.button<Required<KindProps>>`
  -webkit-tap-highlight-color: transparent;
  ${phantomButtonStyle}
  font-family: var(--rothko-typography-body-regular);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  border: 0.125rem solid ${({ kind }) => `var(--rothko-${kind}-500, #000)`};
  user-select: none;

  // fix later to work with theming
  background: #ffffff;
  color: ${({ kind }) => `var(--rothko-${kind}-500, #000)`};

  &.selected {
    background: ${({ kind }) => `var(--rothko-${kind}-500, #000)`};
    color: var(--rothko-color, #000);
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
    border-color: ${({ kind }) => `var(--rothko-${kind}-transparent-600, #000)`};
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

export default OptionGroup;
