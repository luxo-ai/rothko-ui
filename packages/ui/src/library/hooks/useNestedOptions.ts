import type { Reducer } from 'react';
import { useCallback, useMemo, useReducer } from 'react';

import { Stack } from '@rothko-ui/utils';

import { useDebuggerContext } from '../DebuggerContext';
import type { NestedOption } from '../types';
import { INITIAL_OPTION_IDX } from './constants';
import type { Direction, StackValue } from './types';
import { createStackOptions, dial } from './utils';

type State<V, T> = {
  optIdx: number;
  optionStack: Stack<StackValue<V, T>>;
};

type Action<V, T> =
  | { type: 'RESET' }
  | { type: 'PUSH_OPT'; op: NestedOption<V, T> }
  | { type: 'POP_OPT' }
  | { type: 'DIAL'; direction: Direction; max: number };

const reducer = <V, T>(state: State<V, T>, action: Action<V, T>): State<V, T> => {
  switch (action.type) {
    case 'RESET': {
      return {
        optIdx: INITIAL_OPTION_IDX,
        optionStack: Stack.EMPTY,
      };
    }
    case 'POP_OPT': {
      const { parentOption } = state.optionStack.peek() || {};
      return {
        optIdx: parentOption?.optIdx ?? INITIAL_OPTION_IDX,
        optionStack: state.optionStack.pop(),
      };
    }
    case 'DIAL': {
      return {
        ...state,
        optIdx: dial[action.direction](state.optIdx, action.max),
      };
    }
    case 'PUSH_OPT': {
      return {
        optIdx: INITIAL_OPTION_IDX,
        optionStack: state.optionStack.push({
          parentOption: { label: action.op.label, optIdx: state.optIdx },
          options: createStackOptions(action.op.options || []),
        }),
      };
    }
    default:
      return state;
  }
};

// like useOptions but for nested options
const useNestedOptions = <V, T>(initialOptions: NestedOption<V, T>[]) => {
  const debug = useDebuggerContext('useNestedOptions');

  const [{ optionStack, optIdx }, dispatch] = useReducer<Reducer<State<V, T>, Action<V, T>>>(
    reducer,
    { optIdx: INITIAL_OPTION_IDX, optionStack: Stack.EMPTY }
  );

  const { options, parentOption } = useMemo(() => {
    return (
      optionStack.peek() || { parentOption: null, options: createStackOptions(initialOptions) }
    );
  }, [optionStack, initialOptions]);

  const moveOptionIdx = useCallback(
    (direction: Direction) => {
      debug(`moveOptionIdx(direction: ${direction})`);
      if (options.length <= 0) return;
      // rotate through the indexes
      dispatch({ type: 'DIAL', direction, max: options.length - 1 });
    },
    [options.length, debug]
  );

  return {
    dispatch,
    moveOptionIdx,
    optIdx,
    options,
    optionStack,
    title: parentOption?.label,
  };
};

export default useNestedOptions;
