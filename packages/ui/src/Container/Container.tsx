import React, { useMemo } from 'react';
import type { CSSProperties } from 'styled-components';
import styled from 'styled-components';
import { idkFn } from '../Theme/theme';
import type { RothkoKind } from '../Theme/types';
import { isRothkoKind } from '../Theme/types';

export type CustomColorCssProperties = Omit<
  CSSProperties,
  'color' | 'backgroundColor' | 'borderColor'
> & {
  color?: RothkoKind | string;
  backgroundColor?: RothkoKind | string;
  borderColor?: RothkoKind | string;
};

export const useStyleProps = ({
  backgroundColor,
  borderColor,
  color,
  ...rest
}: CustomColorCssProperties) => {
  const style = useMemo(() => {
    let baseStyle = {};
    if (color) {
      baseStyle = { ...baseStyle, color: isRothkoKind(color) ? idkFn(color) : color };
    }
    if (backgroundColor) {
      baseStyle = {
        ...baseStyle,
        backgroundColor: isRothkoKind(backgroundColor) ? idkFn(backgroundColor) : color,
      };
    }
    if (borderColor) {
      baseStyle = {
        ...baseStyle,
        borderColor: isRothkoKind(borderColor) ? idkFn(borderColor) : color,
      };
    }
    if (rest) {
      baseStyle = { ...baseStyle, ...rest };
    }
    return baseStyle;
  }, [backgroundColor, borderColor, color]);

  return style;
};

type ContainerProps = CustomColorCssProperties & {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as, children, className, ...styles }, ref) => {
    const style = useStyleProps(styles);
    return (
      <StyledContainerDiv ref={ref} as={as} className={className} style={style}>
        {children}
      </StyledContainerDiv>
    );
  }
);

Container.displayName = 'Container';

const StyledContainerDiv = styled.div``;

export default Container;
