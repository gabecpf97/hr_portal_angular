import { createActionGroup, props } from '@ngrx/store';
import { visa } from 'src/app/interfaces/visa';

export const visaActions = createActionGroup({
  source: 'Visa',
  events: {
    addAll: props<{ visaList: Array<visa> }>(),
    update: props<{ newVisa: visa }>(),
  },
});
