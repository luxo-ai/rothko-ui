import React, { useMemo } from 'react';
import type { CSSProperties } from 'styled-components';
import styled from 'styled-components';
import type { RothkoKind } from '../theme';
import { isRothkoKind } from '../theme';

export type CustomColorCssProperties = Omit<
  CSSProperties,
  'color' | 'backgroundColor' | 'borderColor'
> &
  Pick<React.HTMLAttributes<HTMLDivElement>, 'onFocus' | 'onBlur' | 'onClick'> & {
    color?: RothkoKind | string;
    backgroundColor?: RothkoKind | string;
    borderColor?: RothkoKind | string;
    onFocus?: (e: React.FocusEvent<HTMLElement, Element>) => void;
    onBlur?: (e: React.FocusEvent<HTMLElement, Element>) => void;
  };

export const useStyleProps = ({
  backgroundColor,
  borderColor,
  color,
  borderBottomColor,
  borderTopColor,
  borderLeftColor,
  borderRightColor,
  ...rest
}: CustomColorCssProperties) => {
  const style = useMemo(() => {
    let baseStyle = {};
    if (color) {
      baseStyle = {
        ...baseStyle,
        color: isRothkoKind(color) ? `var(--rothko-${color}-500, #000)` : color,
      };
    }
    if (backgroundColor) {
      baseStyle = {
        ...baseStyle,
        backgroundColor: isRothkoKind(backgroundColor)
          ? `var(--rothko-${backgroundColor}-500, #000)`
          : backgroundColor,
      };
    }
    if (borderColor) {
      baseStyle = {
        ...baseStyle,
        borderColor: isRothkoKind(borderColor)
          ? `var(--rothko-${borderColor}-500, #000)`
          : borderColor,
      };
    }
    if (borderTopColor) {
      baseStyle = {
        ...baseStyle,
        borderColor: isRothkoKind(borderTopColor)
          ? `var(--rothko-${borderTopColor}-500, #000)`
          : borderTopColor,
      };
    }
    if (borderRightColor) {
      baseStyle = {
        ...baseStyle,
        borderColor: isRothkoKind(borderRightColor)
          ? `var(--rothko-${borderRightColor}-500, #000)`
          : borderRightColor,
      };
    }
    if (borderBottomColor) {
      baseStyle = {
        ...baseStyle,
        borderColor: isRothkoKind(borderBottomColor)
          ? `var(--rothko-${borderBottomColor}-500, #000)`
          : borderBottomColor,
      };
    }
    if (borderLeftColor) {
      baseStyle = {
        ...baseStyle,
        borderColor: isRothkoKind(borderLeftColor)
          ? `var(--rothko-${borderLeftColor}-500, #000)`
          : borderLeftColor,
      };
    }
    if (rest) {
      baseStyle = { ...baseStyle, ...rest };
    }
    return baseStyle;
  }, [backgroundColor, borderColor, color, rest]);

  return style;
};

type ContainerProps = CustomColorCssProperties & {
  id?: string;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as, id, children, className, onBlur, onClick, onFocus, ariaLabel, ...styles }, ref) => {
    const style = useStyleProps(styles);
    return (
      <StyledContainerDiv
        id={id}
        ref={ref}
        as={as}
        onBlur={onBlur}
        onClick={onClick}
        onFocus={onFocus}
        aria-label={ariaLabel}
        className={className}
        style={style}
      >
        {children}
      </StyledContainerDiv>
    );
  }
);

Container.displayName = 'Container';

const StyledContainerDiv = styled.div``;

export default Container;
