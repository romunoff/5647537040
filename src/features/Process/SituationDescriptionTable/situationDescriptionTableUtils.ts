import { Column, Data } from '../../../shared/PaginationTable/paginationTableUtils';
import { SituationDescription } from '../../../redux/SituationDescription/reducers/situationDescriptionReducer';

export const getColumns = (): Column[] => [
  {
    id: 'id',
    label: 'Id',
  },
  {
    id: 'description',
    label: 'Description',
  },
];

const createData = (situationDescription: SituationDescription): Data => {
  const { id, description } = situationDescription;

  return { id, description };
};

export const getRows = (situationDescriptions: SituationDescription[]): Data[] => situationDescriptions.map(createData);
