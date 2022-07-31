import { Column, Data, DataValueTypes } from '../../../shared/PaginationTable/paginationTableUtils';
import { TransformationDescription } from '../../../redux/TransformationDescription/reducers/transformationDescriptionReducer';
import { SelectItem } from '../../../shared/CustomSelect/CustomSelect';

export const getColumns = (formatDescriptionColumn: Function): Column[] => [
  {
    id: 'name',
    label: 'Name',
    width: '150',
  },
  {
    id: 'description',
    label: 'Description',
    format: (value: DataValueTypes, row: Data) => formatDescriptionColumn(value, row),
  },
];

const createData = (transformationDescription: TransformationDescription): Data => {
  const { id, name, description } = transformationDescription;

  return { id, name, description };
};

export const getRows = (transformationDescriptions: TransformationDescription[]): Data[] =>
  transformationDescriptions.map(createData);

export const getTransformationDescriptionItems = (
  transformationDescriptions: TransformationDescription[],
): SelectItem[] => transformationDescriptions.map((item) => ({ label: item.name, value: item.id }));
