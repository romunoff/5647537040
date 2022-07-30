import { useDispatch, useSelector } from 'react-redux';
import { selectSituationDescriptionState } from '../../../utils/selectors/situationDescription-selectors';
import { Box, createStyles, IconButton, makeStyles, Popover, Theme, Typography } from '@material-ui/core';
import { PaginationTable } from '../../../shared/PaginationTable/PaginationTable';
import { Column, Data, DataValueTypes } from '../../../shared/PaginationTable/paginationTableUtils';
import { getColumns, getRows } from './situationDescriptionTableUtils';
import Papa from 'papaparse';
import {
  addSituationDescription,
  changeSituationDescription,
  clearSituationDescription,
  loadSituationDescription,
  removeSituationDescription,
  SituationDescription,
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
import { TextInput } from '../../../shared/TextInput/TextInput';

export const SituationDescriptionTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const situationDescriptionState = useSelector(selectSituationDescriptionState);

  const [tableData, setTableData] = useState<SituationDescription[]>([]);
  const [editRowData, setEditRowData] = useState<SituationDescription[]>([]);
  const [search, setSearch] = useState<string>('');
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    setTableData(situationDescriptionState.list);
  }, [situationDescriptionState.list.length]);

  useEffect(() => {
    setTableData(
      situationDescriptionState.list.filter((item: SituationDescription) =>
        item.description.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, situationDescriptionState.list]);

  useEffect(() => {
    return () => {
      dispatch(clearSituationDescription());
    };
  }, []);

  const handleOpenAddForm = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAddForm = () => {
    setDescriptionValue('');
    setAnchorEl(null);
  };

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

  const handleEditButton = (id: string | number) => {
    const findItem = situationDescriptionState.list.find((item: SituationDescription) => item.id === id);
    findItem && setEditRowData([...editRowData, findItem]);
  };

  const handleCancelButton = (id: string | number) => {
    setEditRowData(editRowData.filter((item: SituationDescription) => item.id !== id));
  };

  const handleSaveButton = (id: string | number) => {
    const findItem = editRowData.find((item: SituationDescription) => item.id === id);
    findItem && setTableData(tableData.map((item: SituationDescription) => (item.id === id ? findItem : item)));
    dispatch(changeSituationDescription(findItem));
    handleCancelButton(id);
  };

  const formatDescriptionColumn = (value: DataValueTypes, row: Data) =>
    editRowData.some((item: SituationDescription) => item.id === row.id) ? (
      <TextInput
        name={row.id.toString()}
        defaultValue={value}
        onBlur={(event: any) =>
          setEditRowData(
            editRowData.map((item: SituationDescription) =>
              item.id === row.id ? { ...item, description: event.target.value } : item,
            ),
          )
        }
      />
    ) : (
      value
    );

  const createActions = (value: DataValueTypes, row: Data) =>
    editRowData.some((item: SituationDescription) => item.id === row.id) ? (
      <>
        <IconButton color='primary' size='small' onClick={() => handleSaveButton(row.id)}>
          <DoneIcon />
        </IconButton>
        <IconButton color='primary' size='small' onClick={() => handleCancelButton(row.id)}>
          <CloseIcon />
        </IconButton>
      </>
    ) : (
      <>
        <IconButton color='primary' size='small' onClick={() => handleEditButton(row.id)}>
          <EditIcon />
        </IconButton>
        <IconButton color='primary' size='small' onClick={() => dispatch(removeSituationDescription(row.id))}>
          <DeleteIcon />
        </IconButton>
      </>
    );

  const id = anchorEl ? 'situationDescriptionPopover' : undefined;

  const columns: Column[] = getColumns(formatDescriptionColumn, createActions);
  const rows: Data[] = getRows(tableData);

  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <Typography variant='h6'>SITUATION DESCRIPTION</Typography>
      </Box>
      <Box className={classes.wrapper}>
        <Box>
          <TextInput placeholder='Enter description...' value={search} onChange={setSearch} />
        </Box>
        <Box>
          <>
            <IconButton color='primary' size='small' aria-describedby={id} onClick={handleOpenAddForm}>
              <AddIcon />
            </IconButton>
            <Popover
              id={id}
              open={!!anchorEl}
              anchorEl={anchorEl}
              onClose={handleCloseAddForm}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Box className={classes.addForm}>
                <TextInput placeholder='Enter description...' value={descriptionValue} onChange={setDescriptionValue} />
                <Box display='flex'>
                  <IconButton
                    color='primary'
                    size='small'
                    onClick={() => dispatch(addSituationDescription(descriptionValue))}
                  >
                    <DoneIcon />
                  </IconButton>
                  <IconButton color='primary' size='small' onClick={handleCloseAddForm}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            </Popover>
          </>
          <IconButton color='primary' component='label' size='small'>
            <PublishIcon />
            <input type='file' accept='.csv' onChange={uploadFile} hidden />
          </IconButton>
          <IconButton color='primary' component='label' size='small' onClick={downloadFile}>
            <GetAppIcon />
          </IconButton>
        </Box>
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
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(5),
    },
    addForm: {
      width: '300px',
      display: 'flex',
      gap: theme.spacing(5),
      padding: theme.spacing(5),
    },
  }),
);
