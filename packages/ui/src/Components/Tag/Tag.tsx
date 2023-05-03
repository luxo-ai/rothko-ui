import { CloseOutline } from '@rothko-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { phantomButtonStyle } from '../Button/PhantomButton';
import { idkFn } from '../../Theme/theme';
import type { KindProps } from '../../Theme/types';

type TagAppearance = 'filled' | 'outline';

type TagProps = KindProps & {
  appearance?: TagAppearance;
  children?: React.ReactNode;
  onClose?: () => void;
};

const Tag = ({ appearance = 'filled', children, kind = 'primary', onClose }: TagProps) => {
  return (
    <TagContainerDiv appearance={appearance} kind={kind}>
      {children}
      {onClose && (
        <TagCloseButton>
          <CloseOutline
            onClick={onClose}
            fill={appearance === 'filled' ? idkFn(kind, 'text') : idkFn(kind)}
            width={16}
            height={16}
          />
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
  padding: 0.25rem 0.5rem;

  background-color: ${({ kind, appearance }) => {
    return appearance === 'filled' ? idkFn(kind) : 'transparent';
  }};
  color: ${({ kind, appearance }) => {
    return appearance === 'filled' ? idkFn(kind, 'text') : idkFn(kind);
  }};

  border: 1px solid ${({ kind }) => idkFn(kind)};
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
