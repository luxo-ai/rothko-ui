import React from 'react';

import { CloseOutline } from '@rothko-ui/icons';
import { isString, classes, PhantomButton } from '@rothko-ui/system';

import type { WithAria, RothkoKind } from '@rothko-ui/system';

type TagVariant = 'filled' | 'outline';

type AriaAttributes =
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-selected';

type TagProps = {
  /**
   * The `id` attribute of the tag.
   * @type {string}
   */
  id?: string;
  /**
   * The appearance style of the tag.
   * @type {TagVariant}
   * @default 'filled'
   */
  variant?: TagVariant;
  /**
   * The content of the tag.
   * @type {React.ReactNode}
   */
  children?: React.ReactNode;
  /**
   * CSS class name(s).
   * @type {string}
   */
  className?: string;
  /**
   * The tag's semantic style.
   * @type {RothkoKind}
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
   * @type {React.CSSProperties}
   */
  style?: React.CSSProperties;
};

const Tag = ({
  id,
  className,
  style = {},
  variant: appearance = 'filled',
  children,
  kind,
  onClose,
  role,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  'aria-details': ariaDetails,
  'aria-selected': ariaSelected,
}: WithAria<TagProps, AriaAttributes>) => {
  const tagVarStyle = {
    '--tag-background': kind ? `var(--rothko-${kind})` : 'var(--rothko-foreground)',
    '--tag-foreground': kind ? `var(--rothko-${kind}-foreground)` : 'var(--rothko-background)',
  } as React.CSSProperties;

  const tagClassnames = classes(
    'flex',
    'items-center',
    'gap-0.5',
    'w-fit',
    'min-w-16',
    'py-0.75',
    'px-2',
    'justify-center',
    'text-center',
    // ===== text stuff =====
    'rothko-font-regular',
    'rothko-paragraph-size-s',
    // ===== appearance =====
    'border',
    'border-solid',
    appearance === 'filled' && 'bg-(--tag-background)',
    appearance === 'filled' && 'text-(--tag-foreground)',
    appearance === 'filled' && 'border-(--tag-background)',
    appearance === 'outline' && 'text-(--tag-background)',
    appearance === 'outline' && 'border-(--tag-background)',
    'rounded-[50vh]',
    className
  );

  return (
    <div
      id={id}
      role={role}
      className={tagClassnames}
      style={{ ...style, ...tagVarStyle }}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-details={ariaDetails}
      aria-selected={ariaSelected}
    >
      {isString(children) ? (
        <span className="font-smoothing-antialiased m-0">{children}</span>
      ) : (
        <div>{children}</div>
      )}
      {onClose && (
        <PhantomButton
          className="cursor-pointer ml-1 flex items-center justify-center"
          aria-label="Close"
        >
          <CloseOutline aria-hidden onClick={onClose} fill="currentColor" width={16} height={16} />
        </PhantomButton>
      )}
    </div>
  );
};

export default Tag;
