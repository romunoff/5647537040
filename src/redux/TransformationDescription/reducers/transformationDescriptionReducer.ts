import { createSlice } from '@reduxjs/toolkit';
import { ListState } from '../../../utils/reducer-helper';

export interface TransformationDescription {
  id: string | number;
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
    changeTransformationDescription: (state, action) => {
      state.transformationDescriptionState.list = state.transformationDescriptionState.list.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item,
      );
    },
    addTransformationDescription: (state, action) => {
      const list = state.transformationDescriptionState.list;
      state.transformationDescriptionState.list = [
        ...list,
        {
          id: (+list[list.length - 1]?.id || 0) + 1,
          ...action.payload,
        },
      ];
    },
    removeTransformationDescription: (state, action) => {
      state.transformationDescriptionState.list = state.transformationDescriptionState.list.filter(
        (item) => item.id !== action.payload,
      );
    },
    clearTransformationDescription: (state) => {
      state.transformationDescriptionState = { list: [] };
    },
  },
});

export const {
  loadTransformationDescription,
  changeTransformationDescription,
  addTransformationDescription,
  removeTransformationDescription,
  clearTransformationDescription,
} = transformationDescriptionSlice.actions;

export const transformationDescriptionReducer = transformationDescriptionSlice.reducer;
