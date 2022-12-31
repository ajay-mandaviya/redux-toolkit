import { createAction, createReducer } from '@reduxjs/toolkit';

export type CounterState = {
  count: number;
};

// type CounterAction =
//   | { type: 'INCREMENT' | 'DECREMENT'; payload: number }
//   | { type: 'RESET' };

//
export const increment = createAction('INCREMENT', (amount: number) => {
  return { payload: amount };
});
//
export const decrement = createAction('DECREMENT', (amount: number) => {
  return { payload: amount };
});
//
export const reset = createAction('RESET');

//
type CounterAction =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof reset>;

//old
export const reduer = (state: CounterState, action: CounterAction) => {
  if (action.type === increment.type) {
    return { count: state.count + action.payload };
  }
  if (action.type === decrement.type) {
    return { count: state.count - action.payload };
  }
  if (action.type === reset.type) {
    return { count: 0 };
  }
};

//with toolkit
export const counterReducer = createReducer({ count: 0 }, (builder) => {
  builder.addCase(increment, (state, action) => {
    state.count += action.payload;
  });
  builder.addCase(decrement, (state, action) => {
    state.count--;
  });
  builder.addCase(reset, (state) => {
    state.count = 0;
  });
});
