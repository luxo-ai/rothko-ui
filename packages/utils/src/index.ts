import capitalize from 'lodash/capitalize';
import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import isNil from 'lodash/isNil';
import type { Nullable } from './types';

export * from './hooks';
export * from './types';

export const ONE_SEC_MS = 1000;
export const ONE_MIN_SEC = 60;
export const ONE_MIN_MS = ONE_SEC_MS * ONE_MIN_SEC;

export const wait = async (ms: number) => {
  await new Promise(resolve => setTimeout(resolve, ms));
};

export const formatPhoneNumber = (phone: string) => {
  let formatted = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  if (phone.length > 10) {
    formatted += ` Ext. ${phone.slice(10)}`;
  }
  return formatted;
};

export const stripPhoneNumber = (phone: string) =>
  phone.replace(/\s+/g, '').replace(/[()-]/g, '').replace('Ext.', '');

export const isValidEmail = (email: string) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

export const isValidPhone = (phone: string) => {
  return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
};

export const titleCase = (str: string) => {
  if (!str.length) return str;
  return str
    .split(' ')
    .map(i => i[0].toUpperCase() + i.slice(1))
    .join(' ');
};

export const englishList = (items: string[], conjunction = 'and') => {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
  return `${items.slice(0, items.length - 1).join(', ')}, ${conjunction} ${
    items[items.length - 1]
  }`;
};

type HasName = {
  firstName: string;
  lastName: string;
  preferredName?: string;
};

export const getName = <P extends HasName>(person: P, format: 'l f' | 'f l' | 'p l') => {
  const { firstName, preferredName, lastName } = person;
  const result: string[] = [];
  for (const token of format) {
    if (token === 'f') {
      result.push(firstName);
    } else if (token === 'p') {
      result.push(preferredName ?? firstName);
    } else if (token === 'l') {
      result.push(lastName);
    } else {
      result.push(token);
    }
  }
};

export const getDomainFromEmail = (email: string) => {
  return email.toLowerCase().split('@')[1];
};

export const kebabToCamelCase = (str: string) => {
  const camelCaps = str
    .split('-')
    .filter(s => s.length)
    .map(capitalize)
    .join();
  return `${camelCaps.slice(0, 1).toLowerCase()}${camelCaps.slice(1)}`;
};

export const sorterFactory = <T>(by: (t: T) => Nullable<number>, order: 'ASC' | 'DESC' = 'ASC') => {
  const direction = (val: number) => (order === 'ASC' ? val : -val);
  return (a: T, b: T) => {
    const aVal = by(a);
    const bVal = by(b);
    if (isNil(aVal)) {
      return direction(-1);
    }
    if (isNil(bVal)) {
      return direction(1);
    }
    return direction(aVal - bVal);
  };
};

export const flatCompact = <T>(v: Nullable<T> | T[]) => {
  return flatten(compact([v]));
};
