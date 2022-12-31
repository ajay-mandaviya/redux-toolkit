import { useReducer } from 'react';
import { counterReducer, increment ,decrement } from '../features/count-reducer';

export const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={()=>{
        dispatch(increment(1))
      }}>+</button>
      <button onClick={()=>{
        dispatch(decrement(1))
      }}>-</button>
    </div>
  );
};
