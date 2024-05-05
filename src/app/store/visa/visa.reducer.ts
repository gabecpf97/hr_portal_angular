import { createReducer, on } from '@ngrx/store';
import { visaActions } from './visa.actions';
import { visa } from 'src/app/interfaces/visa';

const initialState: ReadonlyArray<visa> = [];

export const visaReducer = createReducer(
  initialState,
  on(visaActions.addall, (_state, { visaList }) => {
    return [...visaList];
  }),

  on(visaActions.update, (state, { newVisa }) => {
    const newList = state.map((visa) => {
      if (visa._id === newVisa._id) {
        return newVisa;
      } else {
        return visa;
      }
    });
    return [...newList];
  })
);
