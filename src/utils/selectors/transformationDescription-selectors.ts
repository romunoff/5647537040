import { RootState } from '../../app-configs/config-store';

export const selectTransformationDescriptionState = (state: RootState) =>
  state.transformationDescription.transformationDescriptionState;
