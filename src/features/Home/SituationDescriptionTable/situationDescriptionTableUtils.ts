import { Column, Data, DataValueTypes } from '../../../shared/PaginationTable/paginationTableUtils';
import { SituationDescription } from '../../../redux/SituationDescription/reducers/situationDescriptionReducer';

export const getColumns = (formatDescriptionColumn: Function, createActions: Function): Column[] => [
  {
    id: 'id',
    label: 'Id',
  },
  {
    id: 'description',
    label: 'Description',
    format: (value: DataValueTypes, row: Data) => formatDescriptionColumn(value, row),
  },
  {
    id: 'flex',
    label: 'Flex',
    align: 'right',
    format: (value: DataValueTypes, row: Data) => createActions(value, row),
  },
];

const createData = (situationDescription: SituationDescription): Data => {
  const { id, description } = situationDescription;

  return { id, description };
};

export const getRows = (situationDescriptions: SituationDescription[]): Data[] => situationDescriptions.map(createData);
