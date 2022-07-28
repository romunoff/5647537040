import {
  createStyles,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Theme,
} from '@material-ui/core';
import { useState } from 'react';
import { Column, Data, DEFAULT_ROWS_PER_PAGE } from './paginationTableUtils';
import { lightGrey } from '../../styles/themes/colorVariables';

interface PaginationTableProps {
  columns: Column[];
  rows: Data[];
}

export const PaginationTable = ({ columns, rows }: PaginationTableProps) => {
  const classes = useStyles();

  const [page, setPage] = useState<number>(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const rowsPerPageCount = DEFAULT_ROWS_PER_PAGE;
  const startRow = page * rowsPerPageCount;
  const endRow = startRow + rowsPerPageCount;
  const tableRows = rows.slice(startRow, endRow);

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column: Column) => (
                <TableCell key={column.id} classes={{ root: classes.tableHeadCell }} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row: Data) => (
              <TableRow key={row.id} hover>
                {columns.map((column: Column) => (
                  <TableCell key={column.id} align={column.align} classes={{ root: classes.tableBodyCell }}>
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {!tableRows.length && (
              <TableRow>
                <TableCell classes={{ root: classes.noResults }} colSpan={columns.length} align='center'>
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPageCount}
        rowsPerPageOptions={[]}
      />
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      border: `1px solid ${lightGrey}`,
      boxShadow: 'none',
      borderRadius: theme.spacing(5),
    },
    tableHeadCell: {
      fontWeight: 700,
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.5),
      background: 'none',
      borderRight: `1px solid ${lightGrey}`,
      '&:last-child': {
        borderRight: 0,
      },
    },
    tableBodyCell: {
      borderBottom: `1px solid ${lightGrey}`,
      '&:first-child': {
        color: theme.palette.primary.main,
      },
    },
    noResults: {
      borderBottom: 0,
      padding: '0.5rem',
    },
  }),
);
