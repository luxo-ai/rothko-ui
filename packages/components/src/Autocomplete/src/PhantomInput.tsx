import { classes } from '@rothko-ui/system';
import React from 'react';

type PhantomInputProps = {
  id?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  value: string;
};

const classNames = classes(
  'ios-tap-highlight-color-transparent',
  'text-(--rothko-typography-body-color)',
  'font-rothko-regular',
  'font-size-(--rothko-font-size-body)',
  'line-height-(--rothko-line-height-body)',
  'appearance-none',
  'bg-transparent',
  'border-none',
  'outline-none',
  'whitespace-nowrap',
  'overflow-hidden',
  'text-ellipsis',
  'w-full',
  'disabled:pointer-events-none',
  'disabled:cursor-not-allowed'
);

export const PhantomInput = ({ id, onChange, disabled, placeholder, value }: PhantomInputProps) => {
  return (
    <input
      aria-autocomplete="list"
      aria-controls={id}
      autoComplete="off"
      spellCheck="false"
      onChange={e => onChange(e.target.value)}
      type="text"
      aria-label="Search"
      tabIndex={0}
      value={value}
      disabled={disabled}
      className={classNames}
      placeholder={placeholder}
    />
  );
};
