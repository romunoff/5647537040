import { useDispatch, useSelector } from 'react-redux';
import { selectSituationDescriptionState } from '../../../utils/selectors/situationDescription-selectors';
import { Box, createStyles, IconButton, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { PaginationTable } from '../../../shared/PaginationTable/PaginationTable';
import { Column, Data, DataValueTypes } from '../../../shared/PaginationTable/paginationTableUtils';
import { getColumns, getRows } from './situationDescriptionTableUtils';
import Papa from 'papaparse';
import {
  changeSituationDescription,
  clearSituationDescription,
  loadSituationDescription,
  removeSituationDescription,
} from '../../../redux/SituationDescription/reducers/situationDescriptionReducer';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { downloadCsvFile } from '../../../utils/download-helper';

export const SituationDescriptionTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const situationDescriptionState = useSelector(selectSituationDescriptionState);

  const [editRowIds, setEditRowIds] = useState<(string | number)[]>([]);

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

  const downloadFile = () => {
    downloadCsvFile(Papa.unparse(situationDescriptionState.list), 'situationDescription.csv');
  };

  const formatDescriptionColumn = (value: DataValueTypes, row: Data) =>
    editRowIds.includes(row.id) ? <TextField defaultValue={value} name={row.id.toString()} /> : value;

  const createActions = (value: DataValueTypes, row: Data) =>
    editRowIds.includes(row.id) ? (
      <>
        <IconButton
          color='primary'
          size='small'
          onClick={() => {
            dispatch(changeSituationDescription({ id: row.id, description: value }));
            setEditRowIds(editRowIds.filter((item: string | number) => item !== row.id));
          }}
        >
          <DoneIcon />
        </IconButton>
        <IconButton
          color='primary'
          size='small'
          onClick={() => setEditRowIds(editRowIds.filter((item: string | number) => item !== row.id))}
        >
          <CloseIcon />
        </IconButton>
      </>
    ) : (
      <>
        <IconButton color='primary' size='small' onClick={() => setEditRowIds([...editRowIds, row.id])}>
          <EditIcon />
        </IconButton>
        <IconButton color='primary' size='small' onClick={() => dispatch(removeSituationDescription(row.id))}>
          <DeleteIcon />
        </IconButton>
      </>
    );

  const columns: Column[] = getColumns(formatDescriptionColumn, createActions);
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
        <IconButton color='primary' component='label' size='small' onClick={downloadFile}>
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
