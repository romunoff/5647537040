import { createSlice } from '@reduxjs/toolkit';
import { ListState } from '../../../utils/reducer-helper';
import { TransformationDescription } from '../../TransformationDescription/reducers/transformationDescriptionReducer';

export interface SituationDescription {
  id: string | number;
  description: string;
  transformationDescription: TransformationDescription[];
}

interface SituationDescriptionState {
  situationDescriptionState: ListState<SituationDescription>;
}

const initialState: SituationDescriptionState = {
  situationDescriptionState: { list: [] },
};

const situationDescriptionSlice = createSlice({
  name: 'situationDescription',
  initialState,
  reducers: {
    loadSituationDescription: (state, action) => {
      state.situationDescriptionState.list = action.payload.data.map((item: any) => ({
        ...item,
        transformationDescription: [],
      }));
    },
    changeSituationDescription: (state, action) => {
      state.situationDescriptionState.list = state.situationDescriptionState.list.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item,
      );
    },
    addSituationDescription: (state, action) => {
      const list = state.situationDescriptionState.list;
      state.situationDescriptionState.list = [
        ...list,
        {
          id: (+list[list.length - 1]?.id || 0) + 1,
          description: action.payload,
          transformationDescription: [],
        },
      ];
    },
    removeSituationDescription: (state, action) => {
      state.situationDescriptionState.list = state.situationDescriptionState.list.filter(
        (item) => item.id !== action.payload,
      );
    },
    connectTransformationDescription: (state, action) => {
      console.log(action.payload);
      const list = state.situationDescriptionState.list;
      state.situationDescriptionState.list = list.map((situationDescription) =>
        situationDescription.id === action.payload.situationDescriptionId
          ? {
              ...situationDescription,
              transformationDescription: [
                ...situationDescription.transformationDescription,
                action.payload.transformationDescription,
              ],
            }
          : situationDescription,
      );
    },
    clearSituationDescription: (state) => {
      state.situationDescriptionState = { list: [] };
    },
  },
});

export const {
  loadSituationDescription,
  changeSituationDescription,
  addSituationDescription,
  removeSituationDescription,
  connectTransformationDescription,
  clearSituationDescription,
} = situationDescriptionSlice.actions;

export const situationDescriptionReducer = situationDescriptionSlice.reducer;
