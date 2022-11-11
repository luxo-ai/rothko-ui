import clsx from 'clsx';
import upperCase from 'lodash/upperCase';
import React, { useState } from 'react';
import styled from 'styled-components';
import type { HexColor } from '../Theme/types';
import type { RemSize } from '../types';
import { convertRemToPixels } from '../utils/domUtils';
import { FallbackText } from './Common';

type Background = 'black' | 'white' | 'offBlack';

const backgroundToTextColor: Record<Background, HexColor> = {
  black: '#FFFFFF',
  white: '#000000',
  offBlack: '#FFFFFF',
};

const backgroundToHex: Record<Background, HexColor> = {
  black: '#000000',
  white: '#FFFFFF',
  offBlack: '#03001A',
};

type AvatarProps = Pick<
  React.HTMLProps<HTMLDivElement>,
  'id' | 'className' | 'style' | 'aria-label' | 'onClick'
> & {
  url?: string | null;
  name: string;
  onClick?: () => any | Promise<any>;
  size?: RemSize | number;
  fallbackBackgound?: Background;
};

export const Avatar = ({
  url,
  name,
  onClick,
  size = '4rem',
  className,
  fallbackBackgound = 'offBlack',
  ...divProps
}: AvatarProps) => {
  const [imgDim, setImgDim] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const fallbackInitials = name
    .split(' ')
    .slice(0, 2)
    .map(v => upperCase(v.length > 0 ? v[0] : ''))
    .filter(v => !!v)
    .join(' ');

  const sizeStr = typeof size === 'string' ? size : `${size}px`;
  const sizePx = typeof size === 'string' ? convertRemToPixels(size) : size;

  return (
    <AvatarCircleDiv
      {...divProps}
      size={sizeStr}
      fallbackBackgound={fallbackBackgound}
      onClick={onClick}
      className={clsx({ clickable: !!onClick }, className)}
    >
      {url ? (
        <img
          src={url}
          alt={name}
          onLoad={({ currentTarget: ct }) => {
            setImgDim({ width: ct.naturalWidth, height: ct.naturalHeight });
          }}
          width={sizePx}
          height={sizePx}
          // width={imgDim.width <= imgDim.height ? sizePx : undefined}
          // height={imgDim.height <= imgDim.width ? sizePx : undefined}
        />
      ) : (
        /* make this work according to the size */
        <FallbackText boxSize={sizeStr}>
          <strong>{fallbackInitials}</strong>
        </FallbackText>
      )}
    </AvatarCircleDiv>
  );
};

// eventually theme?
const AvatarCircleDiv = styled.div<{ size: string; fallbackBackgound: Background }>`
  background-color: ${({ fallbackBackgound }) => backgroundToHex[fallbackBackgound]};
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: ${({ fallbackBackgound }) => backgroundToTextColor[fallbackBackgound]};
  &.clickable {
    cursor: pointer;
  }
`;
