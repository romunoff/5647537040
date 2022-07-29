import { createSlice } from '@reduxjs/toolkit';
import { ListState } from '../../../utils/reducer-helper';

export interface SituationDescription {
  id: string;
  description: string;
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
      state.situationDescriptionState.list = action.payload.data;
    },
    changeSituationDescription: (state, action) => {
      state.situationDescriptionState.list = state.situationDescriptionState.list.map((item) =>
        item.id === action.payload.data.id ? { ...item, description: action.payload.data.description } : item,
      );
    },
    removeSituationDescription: (state, action) => {
      state.situationDescriptionState.list = state.situationDescriptionState.list.filter(
        (item) => item.id !== action.payload,
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
  removeSituationDescription,
  clearSituationDescription,
} = situationDescriptionSlice.actions;

export const situationDescriptionReducer = situationDescriptionSlice.reducer;
