import { CloseOutline } from '@rothko-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { phantomButtonStyle } from '../../Libraryy/PhantomButton';
import type { KindProps } from '../../Theme/types';
import { Typography } from '../Typography';
import { semanticTextChildrenStyle, textChildrenStyle } from '../../Libraryy/Styles';

type TagAppearance = 'filled' | 'outline';

type TagProps = KindProps & {
  appearance?: TagAppearance;
  children?: React.ReactNode;
  onClose?: () => void;
};

const Tag = ({ appearance = 'filled', children, kind = 'info', onClose }: TagProps) => {
  const iconColor =
    appearance === 'outline'
      ? `var(--rothko-${kind}-500, #000)`
      : `var(--rothko-${kind}-color, #FFF)`;

  return (
    <TagContainerDiv appearance={appearance} kind={kind}>
      {typeof children === 'string' ? (
        <Typography.inlineBodySmall style={{ margin: 0 }}>{children}</Typography.inlineBodySmall>
      ) : (
        <div>{children}</div>
      )}
      {onClose && (
        <TagCloseButton>
          <CloseOutline onClick={onClose} fill={iconColor} width={16} height={16} />
        </TagCloseButton>
      )}
    </TagContainerDiv>
  );
};

type ContainerProps = Required<KindProps> & {
  appearance: TagAppearance;
};

const TagContainerDiv = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: fit-content;
  min-width: 4rem;
  height: max-content;
  padding: 0.125rem 0.5rem;
  justify-content: center;
  text-align: center;

  background-color: ${({ kind, appearance }) => {
    if (kind) {
      return appearance === 'filled' ? `var(--rothko-${kind}-500, #000)` : 'transparent';
    }
    return appearance === 'filled' ? `var(--rothko-background, #FFF)` : 'transparent';
  }};

  ${({ kind, appearance }) => {
    if (kind) {
      return appearance === 'filled' ? semanticTextChildrenStyle : textChildrenStyle;
    }
    return textChildrenStyle;
  }};

  border: 1px solid
    ${({ kind }) => (kind ? `var(--rothko-${kind}-500, #000)` : `var(--rothko-color, #000)`)};
  border-radius: 50vh;
`;

const TagCloseButton = styled.button`
  ${phantomButtonStyle}
  margin-left: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Tag;
