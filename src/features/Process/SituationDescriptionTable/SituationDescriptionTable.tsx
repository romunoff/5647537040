import { useSelector } from 'react-redux';
import { selectSituationDescriptionState } from '../../../utils/selectors/situationDescription-selectors';
import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { PaginationTable } from '../../../shared/PaginationTable/PaginationTable';
import { Column, Data, DataValueTypes } from '../../../shared/PaginationTable/paginationTableUtils';
import { getColumns, getRows } from './situationDescriptionTableUtils';
import { highlightText } from '../../../utils/highlight-helper';
import { vanillaIce } from '../../../styles/themes/colorVariables';

interface SituationDescriptionTableProps {
  setSituationDescriptionId: Function;
}

export const SituationDescriptionTable = ({ setSituationDescriptionId }: SituationDescriptionTableProps) => {
  const classes = useStyles();

  const situationDescriptionState = useSelector(selectSituationDescriptionState);

  const handleRowClick = (id: string | number) => {
    setSituationDescriptionId(id);
  };

  const formatIdColumn = (value: DataValueTypes, row: Data) => (
    <Box className={classes.clickableId} onClick={() => handleRowClick(row.id)}>
      {value}
    </Box>
  );

  const formatDescriptionColumn = (value: DataValueTypes) => (
    <span onMouseUp={() => highlightText(vanillaIce)}>{value}</span>
  );

  const columns: Column[] = getColumns(formatIdColumn, formatDescriptionColumn);
  const rows: Data[] = getRows(situationDescriptionState.list);

  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <Typography variant='h6'>SITUATION DESCRIPTION</Typography>
      </Box>
      <PaginationTable columns={columns} rows={rows} />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: theme.spacing(10),
    },
    clickableId: {
      '&:hover': {
        fontWeight: 'bold',
        cursor: 'pointer',
      },
    },
  }),
);
