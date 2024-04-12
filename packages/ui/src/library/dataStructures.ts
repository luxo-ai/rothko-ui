export type Stack<T> = readonly T[];

export function stackPush<T>(stack: Stack<T>, val: T) {
  return [...stack, val];
}

export function stackPop<T>(stack: Stack<T>): [Stack<T>, T | null] {
  if (stack.length <= 0) {
    return [[], null];
  }
  const popVal = stack[stack.length - 1];
  const newStack = stack.slice(0, -1);
  return [newStack, popVal];
}

export function stackPeak<T>(stack: Stack<T>) {
  return stack.length > 0 ? stack[stack.length - 1] : null;
}
