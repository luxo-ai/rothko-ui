import clsx from 'clsx';
import times from 'lodash/times';
import React, { useEffect, useMemo, useState } from 'react';
import type { FlattenSimpleInterpolation } from 'styled-components';
import styled, { css } from 'styled-components';
import { Flex, FlexItem } from '../../Layout';
import Grid from '../../Layout/Grid/Grid';
import { phantomButtonStyle } from '../../Library/PhantomButton';
import type { Accessory, Option, Value } from '../../Library/types';
import type { KindProps, RothkoSize } from '../../Theme';
import type { EmSize, RemSize } from '../../types';
import Typography from '../Typography/Typography';

const accessorySizeMap: Record<RothkoSize, number> = {
  xs: 10,
  s: 13,
  m: 18,
  l: 30,
  xl: 35,
};

type OptionArgs = {
  disabled?: boolean;
  accessoryLeft?: Accessory;
  accessoryRight?: Accessory;
};

type OptionGroupProps<V extends Value> = KindProps & {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  maxCol?: number;
  maxRow?: number;
  onChange: (id: V) => void;
  onExpand?: () => void;
  optionGap?: RemSize | EmSize | number;
  options: Option<V, OptionArgs | undefined>[];
  optionsWithRadius?: boolean;
  size?: RothkoSize;
  style?: React.CSSProperties;
  value?: V | null;
  withoutBorder?: boolean;
  accessoryLeft?: Accessory;
  accessoryRight?: Accessory;
};

function OptionGroup<V extends Value>({
  accessoryLeft: globalAccessoryLeft,
  accessoryRight: globalAccessoryRight,
  children,
  className,
  id,
  kind = 'info',
  maxCol = 4,
  maxRow,
  onChange,
  onExpand,
  optionGap = '0.5rem',
  options,
  optionsWithRadius,
  withoutBorder,
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

  const fillRemainingSpace = Boolean(children);
  const remainingSpace = (maxCol - (displayableOptions.length % maxCol)) % maxCol;

  return (
    <OptionGroupContainerDiv id={id} style={style} className={className}>
      <Grid
        role="listbox"
        ariaLabel="option buttons"
        flexGrow={1}
        gridTemplateColumns={`repeat(${maxCol}, 1fr)`}
        gap={optionGap}
      >
        {displayableOptions.map(o => {
          const dataOptions = 'data' in o ? o?.data : undefined;
          const isDisabled = Boolean(dataOptions?.disabled);
          const isSelected = o.id === value;
          const localAccessoryLeft = dataOptions?.accessoryLeft;
          const localAccessoryRight = dataOptions?.accessoryRight;

          const svgColor = isSelected
            ? `var(--rothko-button-${kind}-color, #000)`
            : `var(--rothko-${kind}-500, #000)`;

          const classes = {
            disabled: isDisabled,
            selected: isSelected,
            ['with-radius']: optionsWithRadius,
            ['without-border']: withoutBorder,
          } as const;

          const Left = localAccessoryLeft || globalAccessoryLeft;
          const Right = localAccessoryRight || globalAccessoryRight;

          return (
            <OptionButton
              className={clsx(classes, `opt-size-${size}`)}
              key={o.id}
              kind={kind}
              onClick={isDisabled ? undefined : () => onChange(o.id)}
              role="option"
            >
              <Flex gap="0.5rem" alignItems="center" justifyContent="space-between">
                {Left && (
                  <FlexItem display="flex">
                    <Left size={accessorySizeMap[size]} color={svgColor} />
                  </FlexItem>
                )}
                <FlexItem>{o.label}</FlexItem>
                {Right && (
                  <FlexItem display="flex">
                    <Right size={accessorySizeMap[size]} color={svgColor} />
                  </FlexItem>
                )}
              </Flex>
            </OptionButton>
          );
        })}
        {fillRemainingSpace &&
          remainingSpace > 0 &&
          times(remainingSpace).map(i => (
            <div key={`opt-group-blank-${i}`} id={`opt-group-blank-${i}`} />
          ))}
        {<div>{children}</div>}
      </Grid>
      {maxOptions < options.length && (
        <ExpandButtonLink
          onClick={() => setExpanded(e => !e)}
          className={`expand-button-size-${size} expand-button-width-${size}`}
        >
          {expanded ? '- less' : '+ more'}
        </ExpandButtonLink>
      )}
    </OptionGroupContainerDiv>
  );
}

const sizeMap: Record<RothkoSize, FlattenSimpleInterpolation> = {
  xs: css`
    padding: 0.25rem 0.4rem;
    font-size: 0.75rem;
  `,
  s: css`
    padding: 0.35rem 0.5rem;
    font-size: 0.85rem;
  `,
  m: css`
    padding: 0.5rem 0.5rem;
    font-size: 0.875rem;
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

const OptionGroupContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const OptionButton = styled.button<Required<KindProps>>`
  -webkit-tap-highlight-color: transparent;
  ${phantomButtonStyle}
  font-family: var(--rothko-typography-body-bold); // was reg
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  user-select: none;

  &:not(.without-border) {
    border: 0.1rem solid ${({ kind }) => `var(--rothko-${kind}-500, #000)`};
  }
  // added

  // border-radius: 0.25rem;

  transition-timing-function: cubic-bezier(0, 0, 1, 1);
  transition-property: background-color, color, border-color;
  transition-duration: 0.2s;

  ::selection {
    background: #276ef1;
    color: white;
  }

  // fix later to work with theming
  background: #ffffff;
  color: ${({ kind }) => `var(--rothko-${kind}-500, #000)`};

  &.selected {
    background: ${({ kind }) => `var(--rothko-${kind}-500, #000)`};
    color: ${({ kind }) => `var(--rothko-button-${kind}-color, #000)`};
  }

  &.with-radius {
    border-radius: 0.125rem; // 2px
    border-radius: 0.75rem;
    border-radius: 1rem;
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
