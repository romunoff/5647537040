import { combineReducers } from '@reduxjs/toolkit';
import { situationDescriptionReducer } from '../redux/SituationDescription/reducers/situationDescriptionReducer';
import { transformationDescriptionReducer } from '../redux/TransformationDescription/reducers/transformationDescriptionReducer';

export const rootReducer = combineReducers({
  situationDescription: situationDescriptionReducer,
  transformationDescription: transformationDescriptionReducer,
});
