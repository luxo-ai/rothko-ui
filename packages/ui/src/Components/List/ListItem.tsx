import React from 'react';
import type { CSSProperties } from 'styled-components';
import styled, { css } from 'styled-components';
import { useStyleProps } from '../../Layout/Container';
import Flex from '../../Layout/Flex/Flex';
import FlexItem from '../../Layout/Flex/FlexItem';
import Typography from '../Typography/Typography';

type ListItemProps = CSSProperties & {
  bullet?: JSX.Element;
  children: React.ReactNode;
  className?: string;
};

const ListItem = ({ bullet, children: childrenProp, className, ...styles }: ListItemProps) => {
  const style = useStyleProps(styles);

  const children =
    typeof childrenProp === 'string' ? (
      <Typography.body>{childrenProp}</Typography.body>
    ) : (
      <>{childrenProp}</>
    );

  if (bullet) {
    return (
      <StyledListItem style={style} role="listitem" className={className} hideDefaultBullet>
        <Flex alignItems="center" gap="0.25rem">
          <FlexItem display="flex" flex="0 0 auto">
            {bullet}
          </FlexItem>
          <FlexItem flex="0 0 auto">{children}</FlexItem>
        </Flex>
      </StyledListItem>
    );
  }

  return (
    <StyledListItem style={style} className={className} role="listitem">
      {children}
    </StyledListItem>
  );
};

const StyledListItem = styled.li<{ hideDefaultBullet?: boolean }>`
  ${({ hideDefaultBullet }) =>
    hideDefaultBullet
      ? css`
          list-style-type: none;
        `
      : ''}
  margin: 0.5rem 0;
`;

export default ListItem;
