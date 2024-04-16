import React from 'react';
import styled, { css } from 'styled-components';

const listStyle = css`
  padding: 0 0 0 1rem;
`;

const listElements = {
  ordered: styled.ol`
    ${listStyle}
  `,
  unordered: styled.ul`
    ${listStyle}
  `,
  none: styled.ul`
    ${listStyle}
    list-style-type: none;
  `,
} as const;

type ListKind = keyof typeof listElements;

type ListProps = React.CSSProperties & {
  children: React.ReactNode;
  className?: string;
  kind?: ListKind;
};

const List = ({ children, className, kind = 'unordered', ...style }: ListProps) => {
  const ListEl = listElements[kind];
  return (
    <ListEl style={style} className={className} role="list">
      {children}
    </ListEl>
  );
};

export default List;
