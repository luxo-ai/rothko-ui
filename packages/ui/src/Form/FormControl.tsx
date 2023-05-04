import isString from 'lodash/isString';
import React from 'react';
import Typography from '../Components/Typography/Typography';
import type { RothkoKind } from '../Theme/types';

export type FormControlProps = {
  name: string;
  kind?: RothkoKind;
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
        <Typography.caption kind={kind} className="mb1 dib">
          {label} {required && <Asterisk />}
        </Typography.caption>
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
        <Typography.caption className="tl mt1" kind="danger">
          {error}
        </Typography.caption>
      )}
    </div>
  );
};

const Asterisk = () => <span className="b di red">*</span>;
