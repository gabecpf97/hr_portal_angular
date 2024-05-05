import { createFeatureSelector, createSelector } from '@ngrx/store';
import { visa } from 'src/app/interfaces/visa';

export const selectVisaState =
  createFeatureSelector<ReadonlyArray<visa>>('visa');

export const selectVisaIds = createSelector(selectVisaState, (state) =>
  state.map((visa) => visa._id)
);

export const selectVisaById = (id: string) =>
  createSelector(selectVisaState, (state) =>
    state.find((visa) => visa._id === id)
  );

export const selectInProcessIds = createSelector(selectVisaState, (state) =>
  state
    .filter((visa) => visa?.I20.status !== 'approved')
    .map((visa) => visa._id)
);

export const selectByName = (searchStr: string) =>
  createSelector(selectVisaState, (state) =>
    state
      .filter(
        (visa) =>
          helperFilter(visa.appId.firstName, searchStr) ||
          helperFilter(visa.appId.lastName, searchStr) ||
          (visa.appId.middleName &&
            helperFilter(visa.appId.middleName, searchStr))
      )
      .map((visa) => visa._id)
  );

const helperFilter = (str: string, searchStr: string): boolean => {
  const regex = new RegExp(`^${searchStr}$`, 'i');
  return regex.test(str);
};
