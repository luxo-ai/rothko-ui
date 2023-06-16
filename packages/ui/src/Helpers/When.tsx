import type { Obj } from 'utils';
import React from 'react';

type TruthyValues = Obj | unknown[] | boolean | number | string | symbol;

type WhenProps<T extends TruthyValues> = {
  children: React.ReactNode;
  isTruthy?: T;
};

function When<T extends TruthyValues>({ children, isTruthy }: WhenProps<T>) {
  return isTruthy ? <>{children}</> : null;
}

export default When;
