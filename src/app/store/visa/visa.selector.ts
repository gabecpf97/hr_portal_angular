import { createFeatureSelector, createSelector } from '@ngrx/store';
import { visa } from 'src/app/interfaces/visa';

export const selectVisaState =
  createFeatureSelector<ReadonlyArray<visa>>('visa');

export const selectVisaIds = createSelector(selectVisaState, (state) =>
  state.map((visa) => visa._id)
);

export const selectVisaById = (id: string) => {
  createSelector(selectVisaState, (state) =>
    state.find((visa) => visa._id === id)
  );
};
