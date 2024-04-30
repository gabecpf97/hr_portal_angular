import { createReducer, on } from '@ngrx/store';
import { addUser } from './user.actions';
import { User } from 'src/app/interfaces/user';

export const initialState: ReadonlyArray<User> = [];

export const userReducer = createReducer(
  initialState,
  on(addUser, (state, { username, email }) => {
    return [...state, { username, email }];
  })
);
