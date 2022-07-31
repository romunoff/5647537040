import { Box, createStyles, IconButton, makeStyles, Popover, Theme, Typography } from '@material-ui/core';
import { PaginationTable } from '../../../shared/PaginationTable/PaginationTable';
import { Column, Data, DataValueTypes } from '../../../shared/PaginationTable/paginationTableUtils';
import { getColumns, getRows } from './transformationDescriptionTableUtils';
import Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import { selectTransformationDescriptionState } from '../../../utils/selectors/transformationDescription-selectors';
import {
  addTransformationDescription,
  changeTransformationDescription,
  loadTransformationDescription,
  removeTransformationDescription,
  TransformationDescription,
} from '../../../redux/TransformationDescription/reducers/transformationDescriptionReducer';
import { useEffect, useState } from 'react';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { downloadCsvFile } from '../../../utils/download-helper';
import { TextInput } from '../../../shared/TextInput/TextInput';

export const TransformationDescriptionTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const transformationDescriptionState = useSelector(selectTransformationDescriptionState);

  const [tableData, setTableData] = useState<TransformationDescription[]>([]);
  const [editRowData, setEditRowData] = useState<TransformationDescription[]>([]);
  const [search, setSearch] = useState<string>('');
  const [nameValue, setNameValue] = useState<string>('');
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    setTableData(transformationDescriptionState.list);
  }, [transformationDescriptionState.list.length]);

  useEffect(() => {
    setTableData(
      transformationDescriptionState.list.filter((item: TransformationDescription) =>
        item.description.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, transformationDescriptionState.list]);

  const handleOpenAddForm = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAddForm = () => {
    setNameValue('');
    setDescriptionValue('');
    setAnchorEl(null);
  };

  const uploadFile = (event: any) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim().toLowerCase(),
      complete: (results) => {
        dispatch(loadTransformationDescription({ data: results.data }));
      },
    });
  };

  const downloadFile = () => {
    downloadCsvFile(Papa.unparse(transformationDescriptionState.list), 'transformationDescription.csv');
  };

  const handleEditButton = (id: string | number) => {
    const findItem = transformationDescriptionState.list.find((item: TransformationDescription) => item.id === id);
    findItem && setEditRowData([...editRowData, findItem]);
  };

  const handleCancelButton = (id: string | number) => {
    setEditRowData(editRowData.filter((item: TransformationDescription) => item.id !== id));
  };

  const handleSaveButton = (id: string | number) => {
    const findItem = editRowData.find((item: TransformationDescription) => item.id === id);
    findItem && setTableData(tableData.map((item: TransformationDescription) => (item.id === id ? findItem : item)));
    dispatch(changeTransformationDescription(findItem));
    handleCancelButton(id);
  };

  const formatNameColumn = (value: DataValueTypes, row: Data) =>
    editRowData.some((item: TransformationDescription) => item.id === row.id) ? (
      <TextInput
        name={row.id.toString()}
        defaultValue={value}
        onBlur={(event: any) =>
          setEditRowData(
            editRowData.map((item: TransformationDescription) =>
              item.id === row.id ? { ...item, name: event.target.value } : item,
            ),
          )
        }
      />
    ) : (
      value
    );

  const formatDescriptionColumn = (value: DataValueTypes, row: Data) =>
    editRowData.some((item: TransformationDescription) => item.id === row.id) ? (
      <TextInput
        name={row.id.toString()}
        defaultValue={value}
        onBlur={(event: any) =>
          setEditRowData(
            editRowData.map((item: TransformationDescription) =>
              item.id === row.id ? { ...item, description: event.target.value } : item,
            ),
          )
        }
      />
    ) : (
      value
    );

  const createActions = (value: DataValueTypes, row: Data) =>
    editRowData.some((item: TransformationDescription) => item.id === row.id) ? (
      <>
        <IconButton color='primary' size='small' onClick={() => handleSaveButton(row.id)}>
          <DoneIcon fontSize='small' />
        </IconButton>
        <IconButton color='primary' size='small' onClick={() => handleCancelButton(row.id)}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </>
    ) : (
      <>
        <IconButton color='primary' size='small' onClick={() => handleEditButton(row.id)}>
          <EditIcon fontSize='small' />
        </IconButton>
        <IconButton color='primary' size='small' onClick={() => dispatch(removeTransformationDescription(row.id))}>
          <DeleteIcon fontSize='small' color='error' />
        </IconButton>
      </>
    );

  const id = anchorEl ? 'transformationDescriptionPopover' : undefined;

  const columns: Column[] = getColumns(formatNameColumn, formatDescriptionColumn, createActions);
  const rows: Data[] = getRows(tableData);

  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <Typography variant='h6'>IMAGE TRANSFORMATION DESCRIPTION</Typography>
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
                <TextInput placeholder='Enter name...' value={nameValue} onChange={setNameValue} />
                <TextInput placeholder='Enter description...' value={descriptionValue} onChange={setDescriptionValue} />
                <Box display='flex'>
                  <IconButton
                    color='primary'
                    size='small'
                    onClick={() =>
                      dispatch(addTransformationDescription({ name: nameValue, description: descriptionValue }))
                    }
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
      width: '400px',
      display: 'flex',
      gap: theme.spacing(5),
      padding: theme.spacing(5),
    },
  }),
);
