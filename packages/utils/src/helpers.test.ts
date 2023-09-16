import {
  isArray,
  isString,
  isFunction,
  isNil,
  isNotNil,
  isEmpty,
  capitalize,
  kebabToCamelCase,
  compact,
  asCompactedArray,
  debounce,
  memoize,
  last,
  first,
  omit,
  noop,
  identity,
  parseInt,
  times,
  findBy,
  isTruthy,
  isFalsy,
} from './helpers';

describe('isArray', () => {
  it('should return true for arrays', () => {
    expect(isArray([])).toBe(true);
  });

  it('should return false for non-arrays', () => {
    expect(isArray('string')).toBe(false);
  });
});

describe('isString', () => {
  it('should return true for strings', () => {
    expect(isString('hello')).toBe(true);
  });

  it('should return false for non-strings', () => {
    expect(isString(123)).toBe(false);
  });
});

describe('isFunction', () => {
  it('should return true for functions', () => {
    const fn = () => 'hello';
    expect(isFunction(fn)).toBe(true);
  });

  it('should return false for non-functions', () => {
    expect(isFunction('string')).toBe(false);
  });
});

describe('isNil', () => {
  it('should return true for null or undefined', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
  });

  it('should return false for defined values', () => {
    expect(isNil('hello')).toBe(false);
  });
});

describe('isNotNil', () => {
  it('should return false for null or undefined', () => {
    expect(isNotNil(null)).toBe(false);
    expect(isNotNil(undefined)).toBe(false);
  });

  it('should return true for defined values', () => {
    expect(isNotNil('hello')).toBe(true);
  });
});

describe('isFalsy', () => {
  describe('when value is falsy', () => {
    it('should return true for false', () => {
      expect(isFalsy(false)).toBe(true);
    });

    it('should return true for 0', () => {
      expect(isFalsy(0)).toBe(true);
    });

    it('should return true for an empty string', () => {
      expect(isFalsy('')).toBe(true);
    });

    it('should return true for null', () => {
      expect(isFalsy(null)).toBe(true);
    });

    it('should return true for undefined', () => {
      expect(isFalsy(undefined)).toBe(true);
    });

    it('should return true for NaN', () => {
      expect(isFalsy(NaN)).toBe(true);
    });
  });

  describe('when value is truthy', () => {
    it('should return false for true', () => {
      expect(isFalsy(true)).toBe(false);
    });

    it('should return false for non-zero numbers', () => {
      expect(isFalsy(42)).toBe(false);
    });

    it('should return false for non-empty strings', () => {
      expect(isFalsy('hello')).toBe(false);
    });

    it('should return false for objects', () => {
      expect(isFalsy({ key: 'value' })).toBe(false);
    });

    it('should return false for arrays', () => {
      expect(isFalsy([1, 2, 3])).toBe(false);
    });
  });
});

describe('isTruthy', () => {
  describe('when value is truthy', () => {
    it('should return true for true', () => {
      expect(isTruthy(true)).toBe(true);
    });

    it('should return true for non-zero numbers', () => {
      expect(isTruthy(42)).toBe(true);
    });

    it('should return true for non-empty strings', () => {
      expect(isTruthy('hello')).toBe(true);
    });

    it('should return true for objects', () => {
      expect(isTruthy({ key: 'value' })).toBe(true);
    });

    it('should return true for arrays', () => {
      expect(isTruthy([1, 2, 3])).toBe(true);
    });
  });

  describe('when value is falsy', () => {
    it('should return false for false', () => {
      expect(isTruthy(false)).toBe(false);
    });

    it('should return false for 0', () => {
      expect(isTruthy(0)).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(isTruthy('')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isTruthy(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isTruthy(undefined)).toBe(false);
    });

    it('should return false for NaN', () => {
      expect(isTruthy(NaN)).toBe(false);
    });
  });
});

describe('isEmpty', () => {
  it('should return true for empty values', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty('')).toBe(true);
  });

  it('should return false for non-empty values', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty({ key: 'value' })).toBe(false);
    expect(isEmpty('hello')).toBe(false);
  });
});

describe('capitalize', () => {
  it('should capitalize the first letter and make the rest lowercase', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('WORLD')).toBe('World');
  });
});

describe('kebabToCamelCase', () => {
  it('should convert kebab-case to camelCase', () => {
    expect(kebabToCamelCase('hello-world')).toBe('helloWorld');
  });
});

describe('compact', () => {
  it('should remove falsy values from an array', () => {
    expect(compact([0, 1, false, '', 'hello'])).toEqual([1, 'hello']);
  });
});

describe('asCompactedArray', () => {
  it('should return compacted array for arrays', () => {
    expect(asCompactedArray([1, null, 'hello'])).toEqual([1, 'hello']);
  });

  it('should wrap non-array values in an array and compact', () => {
    expect(asCompactedArray('hello')).toEqual(['hello']);
    expect(asCompactedArray(null)).toEqual([]);
  });
});

// Additional tests for debounce and memoize will require more intricate setups.
// Skipping them for this example.

describe('last', () => {
  it('should return the last element of an array', () => {
    expect(last([1, 2, 3])).toBe(3);
  });
});

describe('first', () => {
  it('should return the first element of an array', () => {
    expect(first([1, 2, 3])).toBe(1);
  });
});

describe('omit', () => {
  it('should return an object without the omitted keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ['a', 'c'])).toEqual({ b: 2 });
  });
});

describe('noop', () => {
  it('should do nothing', () => {
    expect(noop()).toBeUndefined();
  });
});

describe('identity', () => {
  it('should return the input value', () => {
    expect(identity(5)).toBe(5);
  });
});

describe('parseInt', () => {
  it('should parse the string to an integer', () => {
    expect(parseInt('100', 2)).toBe(4);
  });
});

describe('times', () => {
  it('should call a function a specified number of times', () => {
    const result = times(3, n => n * 2);
    expect(result).toEqual([0, 2, 4]);
  });
});

describe('findBy', () => {
  it('should find the first element matching the predicate', () => {
    const arr = [1, 2, 3, 4];
    expect(findBy(arr, x => x % 2 === 0)).toBe(2);
  });
});
