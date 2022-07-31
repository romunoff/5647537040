import { createSlice } from '@reduxjs/toolkit';
import { ListState } from '../../../utils/reducer-helper';

export interface SituationDescription {
  id: string | number;
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
        },
      ];
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
  addSituationDescription,
  removeSituationDescription,
  clearSituationDescription,
} = situationDescriptionSlice.actions;

export const situationDescriptionReducer = situationDescriptionSlice.reducer;
