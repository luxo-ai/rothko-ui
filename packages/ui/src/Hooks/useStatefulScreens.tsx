/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Obj } from '@rothko-ui/utils';
import { cloneDeep, isFunction, last } from '@rothko-ui/utils';
import React, { useReducer } from 'react';
import { useDebuggerContext } from '../Library/DebuggerContext';

type Dispatch<Event extends keyof any, Ctx> = (e: Event, updater?: (ctx: Ctx) => Ctx) => void;

type Transition<Key extends keyof any, Ctx> = {
  goTo: Key | ((ctx: Ctx) => Key | null) | null;
};

type Screen<Key extends keyof any, Event extends keyof any, Ctx> = {
  render: (props: ScreenProps<Event, Ctx>) => JSX.Element | null;
  on: { [e in Event]?: Transition<Key, Ctx> };
};

export type Config<Event extends keyof any, Ctx extends Obj, Key extends keyof any = string> = {
  initialScreen: Key;
  initialCtx: Ctx;
  screens: Record<Key, Screen<Key, Event, Ctx>>;
  onExit?: (ctx: Ctx) => void;
};

export type ScreenProps<Event extends keyof any, Ctx> = {
  dispatch: Dispatch<Event, Ctx>;
  ctx: Ctx;
  goBack: (() => void) | null;
};

type ReducerState<Ctx, Key extends keyof any = string> = {
  stack: (Key | null)[];
  context: Ctx;
};

type Action<Ctx, Event extends keyof any> =
  | { type: 'back' }
  | { type: 'reset' }
  | { type: 'forward'; event: Event; updater?: (ctx: Ctx) => Ctx };

export const useStatefulScreens = <
  Ctx extends Obj,
  Event extends keyof any,
  Key extends keyof any = string
>(
  config: Config<Event, Ctx, Key>
) => {
  const debug = useDebuggerContext('useStatefulScreeens');

  const [state, dispatch] = useReducer(
    ({ stack, context }: ReducerState<Ctx, Key>, action: Action<Ctx, Event>) => {
      if (action.type === 'back') {
        debug(action);
        return { context, stack: stack.length <= 1 ? stack : stack.slice(0, -1) };
      }
      if (action.type === 'reset') {
        debug(action);
        return { stack: [config.initialScreen], context: config.initialCtx };
      }

      const forward = config.screens[last(stack)!]?.on[action.event];

      if (!forward) return { stack, context };

      const clonedCtx = cloneDeep(context);
      const nextContext = action.updater ? action.updater(clonedCtx) : clonedCtx;

      const nextScreenKey = isFunction(forward.goTo) ? forward.goTo(context) : forward.goTo;
      const nextStack = [...stack, nextScreenKey];
      if (nextScreenKey === null) setImmediate(() => config.onExit?.(nextContext));

      debug(action.event, nextStack as any, { prevCtx: context, nextCtx: nextContext });
      return { stack: nextStack, context: nextContext };
    },
    { stack: [config.initialScreen], context: config.initialCtx }
  );

  const goBack = state.stack.length > 1 ? () => dispatch({ type: 'back' }) : null;

  const currentScreenKey = last(state.stack);
  const Screen = currentScreenKey && config.screens[currentScreenKey]?.render;

  debug({ currentScreenKey });
  return {
    goBack,
    Screen: () =>
      Screen ? (
        <Screen
          dispatch={(event, updater) => dispatch({ type: 'forward', event, updater })}
          ctx={cloneDeep(state.context)}
          goBack={goBack}
        />
      ) : null,
  };
};
