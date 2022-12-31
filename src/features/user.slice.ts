import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import data from '../api/data.json';

type UserState = {
  entities: User[];
};

const initialState: UserState = {
  entities: data.users,
};

type DraftUser = RequireOnly<User, 'realName' | 'alterEgo'>;

const createUser = (user: DraftUser): User => {
  return {
    ...user,
    id: nanoid(),
    tasks: [],
  };
};
const useSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.entities.unshift(createUser(action.payload));
    },
    removeUser: (state, action: PayloadAction<User['id']>) => {
      const index = state.entities.findIndex(
        (user) => user.id === action.payload,
      );
      state.entities.splice(index, 1);
    },
  },
});

export const userReducer = useSlice.reducer;
export const { addUser, removeUser } = useSlice.actions;
