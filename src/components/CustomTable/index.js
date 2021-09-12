import React, { useState } from 'react';

import { ThemeProvider, createTheme } from '@material-ui/core';
import { TableRow, Table, TableBody, TablePagination } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { CustomTableHead, IconContainer, EditDeleteCell, CustomTableContainer } from './style';
const theme = createTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: '5px 20px',
      },
    },
  },
});
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <IconContainer>
      <IconButton aria-label="previous page" disabled={page === 0} onClick={handleBackButtonClick}>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        aria-label="next page"
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        onClick={handleNextButtonClick}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </IconContainer>
  );
}

export default function CustomTable({ rows, header, editDelete, tablewidth }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // eslint-disable-next-line radix
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomTableContainer component={Paper} tablewidth={tablewidth}>
        <Table aria-label="custom pagination table">
          <CustomTableHead>
            <TableRow>
              {header.map((head, index) => (
                <TableCell key={index} style={{ color: 'white', padding: '5px !important' }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </CustomTableHead>
          <TableBody>
            {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
              <TableRow key={row.name} style={{ height: 10, padding: '0 !important' }}>
                {Object.keys(row).map((data, index) => (
                  <TableCell key={index} size="medium">
                    {row[data]}
                  </TableCell>
                ))}
                <EditDeleteCell>{editDelete}</EditDeleteCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                ActionsComponent={TablePaginationActions}
                colSpan={7}
                count={rows.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5]}
                SelectProps={{
                  native: true,
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </CustomTableContainer>
    </ThemeProvider>
  );
}
