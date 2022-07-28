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
    clearSituationDescription: (state) => {
      state.situationDescriptionState = { list: [] };
    },
  },
});

export const { loadSituationDescription, clearSituationDescription } = situationDescriptionSlice.actions;

export const situationDescriptionReducer = situationDescriptionSlice.reducer;
