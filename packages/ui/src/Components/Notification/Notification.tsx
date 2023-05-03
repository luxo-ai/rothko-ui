import React from 'react';
import styled from 'styled-components';
import { MinWidth } from '../../Layout/Dimensions';
import { idkFn } from '../../Theme/theme';
import type { HexColor, KindProps, RGBColor, RothkoKind } from '../../Theme';
import { isRothkoKind } from '../../Theme';
import type { EmSize, RemSize } from '../../types';
import { textStyle } from '../Typography/Typography';

type Size = EmSize | RemSize | number;

type NotificationProps = KindProps & {
  children?: React.ReactNode;
  color?: RothkoKind | HexColor | RGBColor;
  count?: number;
  fontColor?: RothkoKind | HexColor | RGBColor;
  maxCount?: number;
  maxLength?: number;
  size: Size;
};

const Notification = ({
  children,
  color,
  count,
  maxLength,
  maxCount,
  fontColor,
  size,
}: NotificationProps) => {
  const adjustedCount = maxCount && count ? Math.min(count, maxCount) : count;
  const numberOfDigits = adjustedCount ? Math.floor(Math.log10(adjustedCount)) + 1 : 0;
  const fewerDigits = maxLength ? Math.max(0, numberOfDigits - maxLength) : 0;
  return (
    <NotificationContainerSpan>
      <DotDiv $color={color} $size={size} $fontColor={fontColor} minW={size}>
        {adjustedCount && fewerDigits <= numberOfDigits && (
          <>
            <p>
              {fewerDigits > 0
                ? `${Math.floor(adjustedCount / 10 ** fewerDigits)}...`
                : adjustedCount}{' '}
            </p>
            {adjustedCount && count !== adjustedCount && <p>+</p>}
          </>
        )}
      </DotDiv>
      {children}
    </NotificationContainerSpan>
  );
};

type DotElProps = {
  $color?: RothkoKind | HexColor | RGBColor;
  $fontColor?: RothkoKind | HexColor | RGBColor;
  $size: Size;
};

const DotDiv = styled(MinWidth)<DotElProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.125rem;

  height: ${({ $size }) => (typeof $size === 'number' ? `${$size}px` : $size)};
  background-color: ${({ $color = '#000' }) => (isRothkoKind($color) ? idkFn($color) : $color)};

  & > p {
    ${textStyle}
    font-size: calc(${({ $size }) => (typeof $size === 'number' ? `${$size}px` : $size)});
  }

  border-radius: 100vh;
  padding: 0.25rem;

  right: 0;
  top: 0;

  transform: translate(
    calc(
      100% - (0.125 * ${({ $size }) => (typeof $size === 'number' ? `${$size}px` : $size)} + 8px)
    ),
    calc(
      -100% + (0.125 * ${({ $size }) => (typeof $size === 'number' ? `${$size}px` : $size)} + 8px)
    )
  );
`;

const NotificationContainerSpan = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

export default Notification;
