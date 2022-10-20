import clsx from 'clsx';
import { isArray } from 'lodash';
import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { phantomButtonStyle } from '../Button/PhantomButton';
import { Option, Value } from '../Library/types';
import { BODY_FONT_FAMILY, Text } from '../Text';
import { AemikoKind, AemikoSize, CanColor, useKindTheme } from '../Theme';

type FilterGroupProps<V extends Value> = {
  kind?: AemikoKind;
  size?: AemikoSize;
  value?: V | V[] | null;
  label?: string;
  options: Option<V>[];
  onSelect: (id: V | V[] | null) => void;
  multible?: boolean;
} & Pick<React.HTMLProps<HTMLDivElement>, 'style' | 'className' | 'id'>;

export function FilterGroup<V extends Value>({
  kind = 'primary',
  size = 's',
  label,
  value,
  options,
  onSelect,
  multible,
  id,
  style,
  className,
}: FilterGroupProps<V>) {
  const [themeColorer] = useKindTheme(kind);
  const valueArray: V[] = !!value ? (isArray(value) ? value : [value]) : [];
  const selectedLookup = new Set(valueArray);
  return (
    <div id={id} style={style} className={className}>
      {label && <FilterText kind="black">{label}</FilterText>}
      <FilterGroupContainerDiv>
        {options.map((o, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === options.length - 1;
          const isSelected = selectedLookup.has(o.id);

          const classObj = {
            selected: isSelected,
            ['left-curved']: isFirst,
            ['right-curved']: isLast,
          } as const;

          return (
            <FilterButton
              onClick={() => {
                if (isSelected) {
                  const arrValues = valueArray.filter(v => v !== o.id);
                  onSelect(multible && arrValues.length ? arrValues : null);
                } else {
                  onSelect(multible ? [...valueArray, o.id] : o.id);
                }
              }}
              themeColorer={themeColorer}
              key={o.id}
              className={clsx(classObj, `filter-size-${size}`)}
            >
              {o.label}
            </FilterButton>
          );
        })}
      </FilterGroupContainerDiv>
    </div>
  );
}

const sizeMap: Record<AemikoSize, FlattenSimpleInterpolation> = {
  xs: css`
    padding: 0.4rem 0.4rem;
    font-size: 0.75rem;
  `,
  s: css`
    padding: 0.4rem 0.4rem;
    font-size: 0.75rem;
  `,
  m: css`
    padding: 0.5rem 0.75rem;
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

const filterBaseStyle = css<CanColor>`
  width: 100%;
  font-family: ${BODY_FONT_FAMILY.regular};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  white-space: nowrap;

  border-color: ${({ themeColorer }) => themeColorer()};
  border-style: solid;

  border-top-width: 1px;
  border-bottom-width: 1px;
  border-right-width: 0;
  border-left-width: 0;

  &.left-curved {
    border-left-width: 1px;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  &.right-curved {
    border-right-width: 1px;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  &.curved {
    border-radius: 0.25rem;
  }

  &.selected {
    background: ${({ themeColorer }) => themeColorer()};
    color: ${({ themeColorer }) => themeColorer('text')};
  }

  &:not(.selected) {
    // fix later to work with theming
    background: #ffffff;
    color: ${({ themeColorer }) => themeColorer()};
  }

  ${Object.entries(sizeMap).map(
    ([key, value]) => css`
      &.filter-size-${key} {
        ${value}
      }
    `
  )}
`;

const FilterButton = styled.button<CanColor>`
  ${phantomButtonStyle}
  ${filterBaseStyle}
  flex: 1 1 0%;
`;

const FilterText = styled(Text.labelLite)`
  margin-bottom: 0.25rem;
  white-space: nowrap;
`;

const FilterGroupContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
