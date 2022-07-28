import { createSlice } from '@reduxjs/toolkit';
import { ListState } from '../../../utils/reducer-helper';

export interface TransformationDescription {
  id: string;
  name: string;
  description: string;
}

interface TransformationDescriptionState {
  transformationDescriptionState: ListState<TransformationDescription>;
}

const initialState: TransformationDescriptionState = {
  transformationDescriptionState: { list: [] },
};

const transformationDescriptionSlice = createSlice({
  name: 'transformationDescription',
  initialState,
  reducers: {
    loadTransformationDescription: (state, action) => {
      state.transformationDescriptionState.list = action.payload.data;
    },
    clearTransformationDescription: (state) => {
      state.transformationDescriptionState = { list: [] };
    },
  },
});

export const { loadTransformationDescription, clearTransformationDescription } = transformationDescriptionSlice.actions;

export const transformationDescriptionReducer = transformationDescriptionSlice.reducer;
