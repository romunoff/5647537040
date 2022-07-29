import { useDispatch, useSelector } from 'react-redux';
import { selectSituationDescriptionState } from '../../../utils/selectors/situationDescription-selectors';
import { Box, createStyles, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { PaginationTable } from '../../../shared/PaginationTable/PaginationTable';
import { Column, Data } from '../../../shared/PaginationTable/paginationTableUtils';
import Papa from 'papaparse';
import {
  clearSituationDescription,
  loadSituationDescription,
} from '../../../redux/SituationDescription/reducers/situationDescriptionReducer';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useEffect } from 'react';
import { getColumns, getRows } from './situationDescriptionTableUtils';

export const SituationDescriptionTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const situationDescriptionState = useSelector(selectSituationDescriptionState);

  useEffect(() => {
    return () => {
      dispatch(clearSituationDescription());
    };
  }, []);

  const uploadFile = (event: any) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim().toLowerCase(),
      complete: (results) => {
        dispatch(loadSituationDescription({ data: results.data }));
      },
    });
  };

  const columns: Column[] = getColumns();
  const rows: Data[] = getRows(situationDescriptionState.list);

  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <Typography variant='h6'>SITUATION DESCRIPTION</Typography>
      </Box>
      <Box className={classes.buttonsContainer}>
        <IconButton color='primary' size='small'>
          <AddIcon />
        </IconButton>
        <IconButton color='primary' component='label' size='small'>
          <PublishIcon />
          <input type='file' accept='.csv' onChange={uploadFile} hidden />
        </IconButton>
        <IconButton color='primary' component='label' size='small'>
          <GetAppIcon />
        </IconButton>
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
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'end',
      marginBottom: theme.spacing(5),
    },
  }),
);
