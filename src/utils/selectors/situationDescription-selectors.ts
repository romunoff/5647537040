import { RootState } from '../../app-configs/config-store';

export const selectSituationDescriptionState = (state: RootState) =>
  state.situationDescription.situationDescriptionState;
