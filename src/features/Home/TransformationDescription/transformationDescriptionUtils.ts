import { Column, Data } from '../../../shared/PaginationTable/paginationTableUtils';
import { TransformationDescription } from '../../../redux/TransformationDescription/reducers/transformationDescriptionReducer';

export const getColumns = (): Column[] => [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'description',
    label: 'Description',
  },
  {
    id: 'flex',
    label: 'Flex',
    align: 'right',
  },
];

const createData = (transformationDescription: TransformationDescription): Data => {
  const { id, name, description } = transformationDescription;

  return { id, name, description };
};

export const getRows = (transformationDescriptions: TransformationDescription[]): Data[] =>
  transformationDescriptions.map(createData);
