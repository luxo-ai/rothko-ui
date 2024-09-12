import React from 'react';
import type { RothkoKind, RothkoSize } from '../../theme';
import type { ButtonAppearance, ButtonVariant } from '../Button/types';
import styles from './ButtonGroup.module.scss';
import { classes, scopedClasses } from '@rothko-ui/utils';

const sc = scopedClasses(styles);

type ButtonGroupProps = {
  appearance?: ButtonAppearance;
  children: React.ReactNode;
  className?: string;
  gap?: number | string;
  kind?: RothkoKind;
  noEffect?: boolean;
  variant?: ButtonVariant;
  size?: RothkoSize;
  style?: React.CSSProperties;
};

const ButtonGroup = ({
  appearance,
  children,
  className,
  gap,
  kind,
  noEffect,
  variant,
  size,
  style = {},
}: ButtonGroupProps) => {
  const baseClasses = sc('button-group', noEffect && 'no-effect');
  const buttonChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    if (child.type !== 'button') {
      // eslint-disable-next-line no-console
      console.warn("ButtonGroup expects 'button' elements as children.");
    }
    return React.cloneElement(child, {
      ...(child.props || {}),
      key: child.key || `bttn${index}`,
      appearance: child.props.appearance || appearance,
      variant: child.props.variant || variant,
      kind: child.props.kind || kind,
      size: child.props.size || size,
    });
  });

  return (
    <div style={{ ...style, gap: gap || style.gap }} className={classes(baseClasses, className)}>
      {buttonChildren}
    </div>
  );
};

export default ButtonGroup;
