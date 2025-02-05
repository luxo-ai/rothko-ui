import React from 'react';

import { CloseOutline } from '@rothko-ui/icons';
import { isString, classes, scopedClasses, vuar, PhantomButton } from '@rothko-ui/system';

import type { WithAria, RothkoKind } from '@rothko-ui/system';
import { Paragraph } from '@rothko-ui/typography';
import styles from './Tag.module.scss';

const sc = scopedClasses(styles);

type TagAppearance = 'filled' | 'outline';

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
   * @type {TagAppearance}
   * @default 'filled'
   */
  appearance?: TagAppearance;
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
}: WithAria<TagProps, AriaAttributes>) => {
  const iconColor = vuar({
    kind,
    category: appearance === 'filled' ? 'foreground' : 'background',
  });

  const baseClasses = sc(`tag--${appearance}`, kind && `tag--${appearance}--${kind}`);

  return (
    <div
      id={id}
      role={role}
      className={classes(baseClasses, className)}
      style={style}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-details={ariaDetails}
      aria-selected={ariaSelected}
    >
      {isString(children) ? (
        <Paragraph size="s" as="span" style={{ margin: 0 }}>
          {children}
        </Paragraph>
      ) : (
        <div>{children}</div>
      )}
      {onClose && (
        <PhantomButton className={styles['tag__close-button']} aria-label="Close">
          <CloseOutline aria-hidden onClick={onClose} fill={iconColor} width={16} height={16} />
        </PhantomButton>
      )}
    </div>
  );
};

export default Tag;
