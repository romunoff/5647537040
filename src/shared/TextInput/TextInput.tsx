import { createStyles, IconButton, makeStyles, TextField } from '@material-ui/core';
import { DataValueTypes } from '../PaginationTable/paginationTableUtils';
import { ChangeEvent } from 'react';
import ClearIcon from '@material-ui/icons/Clear';

interface TextInputProps {
  name?: string;
  defaultValue?: DataValueTypes;
  placeholder?: string;
  value?: string;
  onChange?: Function;
  onBlur?: Function;
}

export const TextInput = ({ name, defaultValue, placeholder, value, onChange, onBlur }: TextInputProps) => {
  const classes = useStyles();

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleClearValue = () => {
    if (onChange) {
      onChange('');
    }
  };

  const handleOnBlur = (event: any) => {
    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <TextField
      classes={{ root: classes.root }}
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      value={value}
      onChange={handleChangeValue}
      onBlur={handleOnBlur}
      InputProps={{
        className: classes.input,
        endAdornment: (
          <IconButton size='small' onClick={handleClearValue} style={{ visibility: value ? 'visible' : 'hidden' }}>
            <ClearIcon classes={{ root: classes.clearIcon }} />
          </IconButton>
        ),
      }}
    />
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    input: {
      fontSize: '0.875rem',
    },
    clearIcon: {
      width: '1rem',
      height: '1rem',
    },
  }),
);
