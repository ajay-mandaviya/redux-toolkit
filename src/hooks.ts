import { useMemo } from 'react';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { ApplicationStateType, ApplicationDispatch } from './store';
export const useAppSelector: TypedUseSelectorHook<ApplicationStateType> =
  useSelector;
export const useAppDispatch: () => ApplicationDispatch = useDispatch;

export const useTasks = () => {
  const tasks = useAppSelector((state) => state.task.entities);
  const loading = useAppSelector((state) => !!state.task.loading);
  return useMemo(() => [tasks, loading] as const, [tasks, loading]);
};
