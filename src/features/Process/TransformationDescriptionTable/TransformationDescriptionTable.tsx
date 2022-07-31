import { Box, createStyles, IconButton, makeStyles, Popover, Theme, Typography } from '@material-ui/core';
import { PaginationTable } from '../../../shared/PaginationTable/PaginationTable';
import { Column, Data, DataValueTypes } from '../../../shared/PaginationTable/paginationTableUtils';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransformationDescriptionState } from '../../../utils/selectors/transformationDescription-selectors';
import { getColumns, getRows, getTransformationDescriptionItems } from './transformationDescriptionTableUtils';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { useState } from 'react';
import { CustomSelect, SelectItem } from '../../../shared/CustomSelect/CustomSelect';
import {
  connectTransformationDescription,
  SituationDescription,
} from '../../../redux/SituationDescription/reducers/situationDescriptionReducer';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { selectSituationDescriptionState } from '../../../utils/selectors/situationDescription-selectors';
import { TransformationDescription } from '../../../redux/TransformationDescription/reducers/transformationDescriptionReducer';
import { highlightText } from '../../../utils/highlight-helper';
import { sandwisp } from '../../../styles/themes/colorVariables';

interface TransformationDescriptionTableProps {
  situationDescriptionId: string | number;
}

export const TransformationDescriptionTable = ({ situationDescriptionId }: TransformationDescriptionTableProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const situationDescriptionState = useSelector(selectSituationDescriptionState);
  const transformationDescriptionState = useSelector(selectTransformationDescriptionState);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [transformationDescriptionId, setTransformationDescriptionId] = useState<string | number>('');

  const handleOpenAddForm = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAddForm = () => {
    setTransformationDescriptionId('');
    setAnchorEl(null);
  };

  const handleSaveButton = () => {
    const transformationDescription = transformationDescriptionState.list.find(
      (item: TransformationDescription) => item.id === transformationDescriptionId,
    );
    dispatch(connectTransformationDescription({ situationDescriptionId, transformationDescription }));
    handleCloseAddForm();
  };

  const formatDescriptionColumn = (value: DataValueTypes) => (
    <span onMouseUp={() => highlightText(sandwisp)}>{value}</span>
  );

  const id = anchorEl ? 'transformationDescriptionPopover' : undefined;
  const items: SelectItem[] = getTransformationDescriptionItems(transformationDescriptionState.list);

  const columns: Column[] = getColumns(formatDescriptionColumn);
  const rows: Data[] = getRows(
    situationDescriptionState.list.find((item: SituationDescription) => item.id === situationDescriptionId)
      ?.transformationDescription || [],
  );

  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <Typography variant='h6'>IMAGE TRANSFORMATION DESCRIPTION (ID No. {situationDescriptionId})</Typography>
      </Box>
      <PaginationTable columns={columns} rows={rows} />
      <Box className={classes.addButton}>
        <IconButton color='primary' size='small' aria-describedby={id} onClick={handleOpenAddForm}>
          <AddCircleOutlineRoundedIcon fontSize='large' />
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
            <CustomSelect items={items} value={transformationDescriptionId} onChange={setTransformationDescriptionId} />
            <Box display='flex'>
              <IconButton color='primary' size='small' onClick={handleSaveButton}>
                <DoneIcon />
              </IconButton>
              <IconButton color='primary' size='small' onClick={handleCloseAddForm}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </Popover>
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
    addForm: {
      width: '300px',
      display: 'flex',
      gap: theme.spacing(5),
      padding: theme.spacing(5),
    },
  }),
);
