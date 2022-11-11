import { CloseOutline } from '@rothko-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { phantomButtonStyle } from '../Button/PhantomButton';
import { CanColor, useKindTheme } from '../Theme';
import { AemikoKind, GreyScale } from '../Theme/types';

type Appearance = 'filled' | 'outline';

type TagProps = {
  kind?: AemikoKind | GreyScale;
  appearance?: Appearance;
  children?: React.ReactNode;
  onClose?: () => void;
};

export const Tag = ({ kind = 'primary', appearance = 'filled', children, onClose }: TagProps) => {
  const [themeColorer] = useKindTheme(kind);
  return (
    <TagContainerSpan appearance={appearance} themeColorer={themeColorer}>
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
    </TagContainerSpan>
  );
};

type ContainerProps = CanColor & { appearance: Appearance };

const TagContainerSpan = styled.span<ContainerProps>`
  display: inline-flex;
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
`;
