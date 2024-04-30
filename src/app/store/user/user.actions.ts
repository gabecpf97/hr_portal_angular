import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';

export const addUser = createAction('[User] add', props<User>());
