import { createReducer, on } from '@ngrx/store';
import { addUser } from './user.actions';
import { User } from 'src/app/interfaces/user';

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user: null,
};
export const userReducer = createReducer(
  initialState,
  on(addUser, (state, { user }) => ({ ...state, user }))
);
