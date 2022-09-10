import isString from 'lodash/isString';
import React from 'react';
import { Text } from '../Text';
import { AemikoKind, GreyScale } from '../Theme/types';

export type FormControlProps = {
  name: string;
  kind?: AemikoKind | GreyScale;
  label?: string | JSX.Element;
  className?: string;
  required?: boolean;
  error?: string;
  children?: React.ReactNode;
};

export const FormControl: React.FC<FormControlProps> = ({
  name,
  kind,
  className,
  children,
  label,
  required,
  error,
}) => {
  const renderLabel = isString(label) ? (
    <label htmlFor={name} className="f5 db mb1">
      {label && (
        <Text.caption kind={kind} className="mb1 dib">
          {label} {required && <Asterisk />}
        </Text.caption>
      )}
    </label>
  ) : (
    label
  );
  return (
    <div className={className}>
      {renderLabel}
      {children}
      {error && (
        <Text.caption className="tl mt1" kind="danger">
          {error}
        </Text.caption>
      )}
    </div>
  );
};

const Asterisk = () => <span className="b di red">*</span>;
