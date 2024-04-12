import React from 'react';
import styled from 'styled-components';

import { CloseOutline } from '@rothko-ui/icons';
import { isString } from '@rothko-ui/utils';

import { phantomButtonStyle } from '../../library/PhantomButton';
import type { KindProps, RothkoKind } from '../../theme/types';
import { Typography } from '../Typography';
import { semanticTextChildrenStyle, textChildrenStyle } from '../../library/Styles';
import type { WithAriaLabeling, WithAriaSelected } from '../../types';

type TagAppearance = 'filled' | 'outline';

type WithAria<T> = WithAriaSelected<WithAriaLabeling<T>>;

type TagProps = WithAria<{
  id?: string;
  /**
   * The appearance style of the tag.
   * @default 'filled'
   */
  appearance?: TagAppearance;
  /**
   * The content of the tag.
   */
  children?: React.ReactNode;
  /**
   * The CSS class name for the tag.
   */
  className?: string;
  /**
   * The kind of tag, which affects the color.
   * @default 'info'
   */
  kind?: RothkoKind;
  /**
   * The callback function when the tag is closed.
   */
  onClose?: () => void;
  /**
   * The ARIA role for the tag.
   */
  role?: React.AriaRole;
  /**
   * The inline style for the tag.
   */
  style?: React.CSSProperties;
}>;

const Tag = ({
  id,
  className,
  style,
  appearance = 'filled',
  children,
  kind = 'info',
  onClose,
  role,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-selected': ariaSelected,
}: TagProps) => {
  const iconColor =
    appearance === 'outline'
      ? `var(--rothko-${kind}-500, #000)`
      : `var(--rothko-${kind}-color, #FFF)`;

  return (
    <TagContainerDiv
      id={id}
      role={role}
      className={className}
      style={style}
      appearance={appearance}
      kind={kind}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-details={ariaDetails}
      aria-selected={ariaSelected}
    >
      {isString(children) ? (
        <Typography.inlineBodySmall style={{ margin: 0 }}>{children}</Typography.inlineBodySmall>
      ) : (
        <div>{children}</div>
      )}
      {onClose && (
        <TagCloseButton aria-label="Close">
          <CloseOutline aria-hidden onClick={onClose} fill={iconColor} width={16} height={16} />
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
