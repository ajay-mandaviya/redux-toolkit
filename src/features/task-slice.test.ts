import { addTask, addTaskWithId, removeTask, tasksReducer } from './task.slice';

describe('tasksSlice', () => {
  const initialState = {
    entities: [
      addTaskWithId({ title: 'Write tests' }),
      addTaskWithId({ title: 'Make them pass' }),
    ],
  };

  it(`should add a task when the ${addTask}`, () => {
    const task = addTaskWithId({ title: 'Profit' });
    const action = addTask(task);
    const newState = tasksReducer(initialState, action);
    expect(newState.entities).toEqual([task, ...initialState.entities]);
  });
});
