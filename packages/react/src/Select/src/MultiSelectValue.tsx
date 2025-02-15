import React from 'react';
import { CloseOutline } from '@rothko-ui/icons';
import { classes, PhantomButton, type Option, type Value } from '@rothko-ui/system';

type MultiSelectValueProps<V extends Value, T> = {
  onClear: (id: V) => void;
  option: Option<V, T>;
};

export function MultiSelectValue<V extends Value, T>({
  option,
  onClear,
}: MultiSelectValueProps<V, T>) {
  const multiSelectValueContainerClassnames = classes(
    'flex',
    'items-center',
    'gap-[0.125rem]',
    'pt-[0.0625rem]',
    'pr-[0.3rem]', // why diff?
    'pb-[0.0625rem]',
    'pl-[0.5rem]',
    'bg-(--rothko-dropdown-multiselect-background)',
    'border',
    'border-solid',
    'border-(--rothko-dropdown-multiselect-border)',
    'rounded-[3.25rem]',
    'cursor-default',
    // let paragraph and svg inherit color
    'text-(--rothko-dropdown-multiselect-foreground)'
  );

  return (
    <div className={multiSelectValueContainerClassnames} tabIndex={-1} key={option.id}>
      <span className="m-0 user-select-none rothko-paragraph-size-s">{option.label}</span>
      <PhantomButton
        aria-label={`Delete ${option.label}`}
        displayFlex
        tabIndex={-1}
        onClick={() => {
          onClear(option.id);
        }}
      >
        <CloseOutline aria-hidden fill="currentColor" width={16} height={16} />
      </PhantomButton>
    </div>
  );
}
