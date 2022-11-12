import { CloseOutline } from '@rothko-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { phantomButtonStyle } from '../Button/PhantomButton';
import type { CanColor } from '../Theme';
import { useKindTheme } from '../Theme';
import type { RothkoKind, GreyScale } from '../Theme/types';

type Appearance = 'filled' | 'outline';

type TagProps = {
  kind?: RothkoKind | GreyScale;
  appearance?: Appearance;
  children?: React.ReactNode;
  onClose?: () => void;
};

export const Tag = ({ kind = 'primary', appearance = 'filled', children, onClose }: TagProps) => {
  const [themeColorer] = useKindTheme(kind);
  return (
    <TagContainerDiv appearance={appearance} themeColorer={themeColorer}>
      {children}
      {onClose && (
        <TagCloseButton>
          <CloseOutline
            onClick={onClose}
            fill={appearance === 'filled' ? themeColorer('text') : themeColorer()}
            width={16}
            height={16}
          />
        </TagCloseButton>
      )}
    </TagContainerDiv>
  );
};

type ContainerProps = CanColor & { appearance: Appearance };

const TagContainerDiv = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ themeColorer, appearance }) =>
    appearance === 'filled' ? themeColorer() : 'transparent'};
  color: ${({ themeColorer, appearance }) =>
    themeColorer(appearance === 'filled' ? 'text' : undefined)};
  border: 1px solid ${({ themeColorer }) => themeColorer()};
  border-radius: 50vh;
  width: fit-content;
  padding: 0.25rem 0.5rem;
`;

const TagCloseButton = styled.button`
  ${phantomButtonStyle}
  margin-left: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
