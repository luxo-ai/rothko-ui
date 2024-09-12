import React from 'react';

import { CloseOutline } from '@rothko-ui/icons';
import { isString, classes, scopedClasses } from '@rothko-ui/utils';

import type { RothkoKind } from '../../theme/types';
import { Typography } from '../Typography';
import { vuar } from '../../library/utils/vuar';
import styles from './Tag.module.scss';
import type { WithAria } from '../../types';

const sc = scopedClasses(styles);

type TagAppearance = 'filled' | 'outline';

type AriaAttributes =
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-describedby'
  | 'aria-details'
  | 'aria-selected';

type TagProps = {
  id?: string;
  /**
   * The appearance style of the tag.
   * @default 'filled'
   */
  appearance?: TagAppearance;
  /**
   * The content of the tag.
   */
  children?: React.ReactNode;
  /**
   * The CSS class name for the tag.
   */
  className?: string;
  /**
   * The kind of tag, which affects the color.
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
        <Typography.bodySmall as="span" style={{ margin: 0 }}>
          {children}
        </Typography.bodySmall>
      ) : (
        <div>{children}</div>
      )}
      {onClose && (
        <button className={styles['tag__close-button']} aria-label="Close">
          <CloseOutline aria-hidden onClick={onClose} fill={iconColor} width={16} height={16} />
        </button>
      )}
    </div>
  );
};

export default Tag;
