import keyboardKey from 'keyboard-key';
import React from 'react';
import styled from 'styled-components';
import { Text } from '../Text';
import { useTheme } from '../Theme';
import { ThemedElement } from '../Theme/types';
import { Option, Value } from '../Elements/Library/types';
import { keyDownFactory } from '../utils/keyUtils';

type RadioProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

type RadioGroupProps<V extends Value> = {
  options: Option<V>[];
  value: V | null;
  onChange: (val: V) => void;
  withLabel?: boolean;
};

export function RadioGroup<V extends Value>({
  options,
  value,
  withLabel,
  onChange,
}: RadioGroupProps<V>) {
  return (
    <div className="mv2">
      {options.map(option => (
        <Radio
          key={option.label}
          onChange={checked => {
            if (checked) onChange(option.id);
          }}
          label={withLabel ? option.label : undefined}
          checked={value === option.id}
        />
      ))}
    </div>
  );
}

export const Radio = ({ label, checked, onChange }: RadioProps) => {
  const { theme } = useTheme();
  const handleChange = () => onChange(!checked);
  const onKeyDown = keyDownFactory({ [keyboardKey.Enter]: handleChange });
  return (
    <div className="flex items-start justify-start">
      <RadioContainer>
        <StyledRadio
          tabIndex={0}
          type="radio"
          onClick={handleChange}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          checked={checked}
          aemikoTheme={theme}
        />
        <div className="radio-outer">
          <div className="radio-inner" />
        </div>
      </RadioContainer>
      {label && <Text.bodySmall>{label}</Text.bodySmall>}
    </div>
  );
};

const RadioContainer = styled.div`
  position: relative;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const StyledRadio = styled.input<ThemedElement>`
  opacity: 0;
  position: absolute;
  cursor: pointer;
  width: 100%;
  height: 100%;

  & ~ .radio-outer {
    border-radius: 50%;
    background-color: white;
    border: 0.125rem solid ${({ aemikoTheme }) => aemikoTheme['basic-500']};
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.6rem;

    > .radio-inner {
      border-radius: 50%;
      background-color: white;
      border: 0.125rem solid white;
      width: 100%;
      height: 100%;
    }
  }

  &:checked ~ .radio-outer {
    border-color: ${({ aemikoTheme }) => aemikoTheme['primary-500']};

    > .radio-inner {
      background-color: ${({ aemikoTheme }) => aemikoTheme['primary-500']};
    }
  }

  &.error:not(:focus) ~ .radio-outer {
    border-color: rgb(255, 239, 237);

    > .radio-inner {
      background-color: rgb(255, 239, 237);
    }
  }

  &:focus-visible {
    & ~ .radio-outer {
      outline: 1px solid ${({ aemikoTheme }) => aemikoTheme['info-300']};
    }
  }
`;
