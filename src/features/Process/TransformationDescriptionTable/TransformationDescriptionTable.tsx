import { Box, createStyles, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { PaginationTable } from '../../../shared/PaginationTable/PaginationTable';
import { Column, Data } from '../../../shared/PaginationTable/paginationTableUtils';
import { useSelector } from 'react-redux';
import { selectTransformationDescriptionState } from '../../../utils/selectors/transformationDescription-selectors';
import { getColumns, getRows } from './transformationDescriptionTableUtils';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

export const TransformationDescriptionTable = () => {
  const classes = useStyles();

  const transformationDescriptionState = useSelector(selectTransformationDescriptionState);

  const columns: Column[] = getColumns();
  const rows: Data[] = getRows(transformationDescriptionState.list);

  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <Typography variant='h6'>IMAGE TRANSFORMATION DESCRIPTION</Typography>
      </Box>
      <PaginationTable columns={columns} rows={rows} />
      <Box className={classes.addButton}>
        <IconButton color='primary' size='small'>
          <AddCircleOutlineRoundedIcon />
        </IconButton>
      </Box>
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
    addButton: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);
