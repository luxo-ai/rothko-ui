import capitalize from 'lodash/capitalize';
import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import type { Nullable } from './types';

export * from './hooks';
export type { DeepPartial, KeyLike, NestedRecord, Nil, Nullable, WithData } from './types';

export const formatPhoneNumber = (phone: string) => {
  let formatted = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  if (phone.length > 10) {
    formatted += ` Ext. ${phone.slice(10)}`;
  }
  return formatted;
};

export const stripPhoneNumber = (phone: string) => {
  return phone.replace(/\s+/g, '').replace(/[()-]/g, '').replace('Ext.', '');
};

export const isValidEmail = (email: string) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

export const isValidPhone = (phone: string) => {
  return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
};

export const kebabToCamelCase = (str: string) => {
  const camelCaps = str
    .split('-')
    .filter(s => s.length)
    .map(capitalize)
    .join();
  return `${camelCaps.slice(0, 1).toLowerCase()}${camelCaps.slice(1)}`;
};

export const flatCompact = <T>(v: Nullable<T> | T[]) => {
  return flatten(compact([v]));
};
