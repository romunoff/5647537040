import { Column, Data, DataValueTypes } from '../../../shared/PaginationTable/paginationTableUtils';
import { TransformationDescription } from '../../../redux/TransformationDescription/reducers/transformationDescriptionReducer';

export const getColumns = (
  formatNameColumn: Function,
  formatDescriptionColumn: Function,
  createActions: Function,
): Column[] => [
  {
    id: 'name',
    label: 'Name',
    width: '150',
    format: (value: DataValueTypes, row: Data) => formatNameColumn(value, row),
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

const createData = (transformationDescription: TransformationDescription): Data => {
  const { id, name, description } = transformationDescription;

  return { id, name, description };
};

export const getRows = (transformationDescriptions: TransformationDescription[]): Data[] =>
  transformationDescriptions.map(createData);
