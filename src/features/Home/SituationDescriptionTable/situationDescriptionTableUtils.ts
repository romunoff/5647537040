import { Column, Data, DataValueTypes } from '../../../shared/PaginationTable/paginationTableUtils';
import { SituationDescription } from '../../../redux/SituationDescription/reducers/situationDescriptionReducer';

export const getColumns = (formatDescriptionColumn: Function, createActions: Function): Column[] => [
  {
    id: 'id',
    label: 'Id',
    width: '50',
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
    width: '100',
    format: (value: DataValueTypes, row: Data) => createActions(value, row),
  },
];

const createData = (situationDescription: SituationDescription): Data => {
  const { id, description } = situationDescription;

  return { id, description };
};

export const getRows = (situationDescriptions: SituationDescription[]): Data[] => situationDescriptions.map(createData);
