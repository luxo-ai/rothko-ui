import { isNil } from './helpers';

type StackNode<T> = Readonly<{
  value: T;
  previous: StackNode<T> | null;
}>;

// stack implementation using an immutable singly linked list.
class Stack<T> {
  private readonly head: StackNode<T> | null;

  /**
   * Creates an instance of an immutable stack.
   */
  private constructor(head: StackNode<T> | null) {
    this.head = head;
    Object.freeze(this);
  }

  /**
   * Creates a stack from an array of values.
   * @param {...V[]} values - The array of values to be converted into a stack.
   * @returns {Stack<V>} A new stack containing the elements from the given array.
   */
  static from<V>(...values: V[]): Stack<V> {
    return values.reduce((acc, value) => acc.push(value), Stack.EMPTY as Stack<V>);
  }

  /**
   * Creates an empty stack.
   * @returns {Stack<any>} An empty stack.
   */
  static get EMPTY() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Stack<any>(null);
  }

  /**
   * Pushes a new value onto the stack.
   * @param {T} value - The value to push onto the stack.
   * @returns {Stack<T>} A new stack with the value added.
   */
  push(value: T): Stack<T> {
    return new Stack<T>({ value, previous: this.head });
  }

  /**
   * Removes the top element from the stack.
   * @returns {Stack<T>} A new stack with the top element removed, or the same stack if it was empty.
   */
  pop(): Stack<T> {
    return !isNil(this.head) ? new Stack<T>(this.head.previous) : this;
  }

  /**
   * Retrieves the top element of the stack without removing it.
   * @returns {T | null} The top element of the stack, or null if the stack is empty.
   */
  peek(): T | null {
    return !isNil(this.head) ? this.head.value : null;
  }

  /**
   * Checks if the stack is empty.
   * @returns {boolean} True if the stack is empty, false otherwise.
   */
  isEmpty(): boolean {
    return isNil(this.head);
  }

  /**
   * Returns the number of elements in the stack.
   * @returns {number} The number of elements in the stack.
   */
  size(): number {
    let count = 0;
    let current: StackNode<T> | null = this.head;
    while (!isNil(current)) {
      count++;
      current = current.previous;
    }
    return count;
  }
}

export default Stack;
