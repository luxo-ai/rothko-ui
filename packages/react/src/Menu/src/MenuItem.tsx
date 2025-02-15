import React, { useContext, useEffect } from 'react';
import { useId } from '@rothko-ui/system';
import MenuContext from './MenuContext';
import { itemBase } from './styles';

type MenuProps = Omit<React.HTMLProps<HTMLLIElement>, 'id' | 'ref' | 'role' | 'tabIndex'> & {
  focused?: boolean;
  disabled?: boolean;
};

const MenuItem = React.forwardRef<HTMLLIElement, MenuProps>(
  (
    {
      className,
      disabled: itemDisabled,
      focused: selected,
      children,
      style,
      onClick,
      'aria-selected': ariaSelected,
      'aria-disabled': ariaDisabled,
      ...listProps
    },
    ref
  ) => {
    const id = useId();
    const { disabled: parentDisabled, scrollIntoView } = useContext(MenuContext);
    const disabled = parentDisabled || itemDisabled;

    useEffect(() => {
      if (!selected) return;
      scrollIntoView(`#${id}`);
    }, [id, scrollIntoView, selected]);

    return (
      <li
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...listProps}
        id={id}
        style={style}
        ref={ref}
        tabIndex={-1}
        aria-selected={ariaSelected || selected}
        aria-disabled={ariaDisabled || disabled}
        role="option"
        className={itemBase(
          'py-[0.75rem] px-[1rem]',
          disabled && 'cursor-not-allowed',
          !disabled && 'cursor-pointer',
          !disabled &&
            'hover:bg-(--rothko-dropdown-option-background-focus) focus:bg-(--rothko-dropdown-option-background-focus)',
          !disabled && selected && 'bg-(--rothko-dropdown-option-background-focus)',
          className
        )}
        onClick={e => {
          if (!disabled && onClick) {
            e.preventDefault();
            onClick(e);
          }
        }}
      >
        {children}
      </li>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
