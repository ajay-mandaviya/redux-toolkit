import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { removeUser } from './user.slice';
export type TaskState = {
  entities: Task[];
  loading?: boolean;
};

const initialState: TaskState = {
  entities: [],
  loading: false,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (): Promise<Task[]> => {
    const response = await fetch('/api/tasks').then((res) => res.json());
    return response.tasks;
  },
);

// make all property to optional for taks
// type DraftTask = Partial<Task>;
// type DraftTask = Pick<Task, 'title'>;
type DraftTask = RequireOnly<Task, 'title'>;
export const addTaskWithId = (task: DraftTask): Task => {
  return {
    id: nanoid(),
    ...task,
  };
};

const taskSlice = createSlice({
  name: 'taks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      const newTask = addTaskWithId(action.payload);
      state.entities.unshift(newTask);
    },
    removeTask: (state, action: PayloadAction<Task['id']>) => {
      const index = state.entities.findIndex(
        (task) => task.id === action.payload,
      );
      state.entities.splice(index, 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(removeUser, (state, action) => {
      const userID = action.payload;
      for (const task of state.entities) {
        if (task.user === userID) {
          task.user = undefined;
        }
      }
    });
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    });
  },
});

export const tasksReducer = taskSlice.reducer;
export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice;
