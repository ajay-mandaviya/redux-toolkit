import { userReducer } from './features/user.slice';
import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './features/task.slice';
const store = configureStore({
  reducer: {
    task: tasksReducer,
    users: userReducer,
  },
});

export type ApplicationStateType = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
export default store;
