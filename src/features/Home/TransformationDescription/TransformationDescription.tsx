import { Box, createStyles, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { PaginationTable } from '../../../shared/PaginationTable/PaginationTable';
import { Column, Data } from '../../../shared/PaginationTable/paginationTableUtils';
import { getColumns, getRows } from './transformationDescriptionUtils';
import Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import { selectTransformationDescriptionState } from '../../../utils/selectors/transformationDescription-selectors';
import {
  clearTransformationDescription,
  loadTransformationDescription,
} from '../../../redux/TransformationDescription/reducers/transformationDescriptionReducer';
import { useEffect } from 'react';

export const TransformationDescription = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const transformationDescriptionState = useSelector(selectTransformationDescriptionState);

  useEffect(() => {
    return () => {
      dispatch(clearTransformationDescription());
    };
  }, []);

  const uploadFile = (event: any) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        dispatch(loadTransformationDescription({ data: results.data }));
      },
    });
  };

  const columns: Column[] = getColumns();
  const rows: Data[] = getRows(transformationDescriptionState.list);

  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <Typography variant='h6'>IMAGE TRANSFORMATION DESCRIPTION</Typography>
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
