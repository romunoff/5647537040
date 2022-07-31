import { createStyles, FormControl, makeStyles, MenuItem, Select } from '@material-ui/core';

export interface SelectItem {
  value: string | number;
  label: string;
}

export interface CustomSelectProps {
  items: SelectItem[];
  value: string | number;
  onChange: Function;
}

export const CustomSelect = ({ items, value, onChange }: CustomSelectProps) => {
  const classes = useStyles();

  const handleOnChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <FormControl className={classes.root}>
      <Select value={value} onChange={handleOnChange} displayEmpty>
        {items.map((item: SelectItem) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
  }),
);
