import React, { useEffect, useState } from 'react';

import {
  TableRow,
  Table,
  TableBody,
  TablePagination,
  IconButton,
  TableCell,
  TableFooter,
  Paper,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { closeModal, openModal } from '../Modal/action';
import ConfirmDeletModal from '../Modal/inex';
import TablePaginationActions from './Pagination';
import { CustomTableHead, CustomTableContainer, TableHeader, DeleteIcon } from './style';
export default function CustomTable({ rows, header, onDelete, cellWidth, tablewidth, onEdit, isEditDelete }) {
  const dispatch = useDispatch();
  const onCancel = () => dispatch(closeModal());
  const onRowDelete = () => {
    onDelete(currentSelectedRow);
    dispatch(closeModal());
  };

  const deletModalButtons = [
    { property: 'Cancel', clickHandler: onCancel },
    { property: 'Confirm', clickHandler: onRowDelete },
  ];
  const [rowsData, setRowsData] = useState([...rows]);
  useEffect(() => {
    setRowsData([...rows]);
  }, [rows]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 10);

    setPage(0);
  };

  const [currentSelectedRow, setCurrentSelectedRow] = useState({});

  const RowPerPage = (rowsPerPage, rowsData, page) => {
    if (rowsPerPage > 0) {
      return rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }

    return rowsData;
  };

  return (
    <CustomTableContainer component={Paper} tablewidth={tablewidth}>
      {isEditDelete && (
        <ConfirmDeletModal modalButtons={deletModalButtons}>
          <div>Are you sure you want to delete ?</div>
        </ConfirmDeletModal>
      )}

      <Table aria-label="custom pagination table">
        <CustomTableHead>
          <TableRow>
            <TableHeader>S.No</TableHeader>
            {header.map((head, index) => {
              if (head != 'id') {
                return <TableHeader key={index}>{head}</TableHeader>;
              }
            })}
          </TableRow>
        </CustomTableHead>

        <TableBody>
          {RowPerPage(rowsPerPage, rowsData, page).map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{index + 1}</TableCell>
              {Object.keys(row).map((data, index) => {
                if (data != 'id') {
                  return (
                    <TableCell key={index} cellwidth={cellWidth}>
                      {row[data]}
                    </TableCell>
                  );
                }
              })}

              {isEditDelete && (
                <TableCell>
                  <IconButton onClick={() => onEdit(row)}>
                    <Edit />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      setCurrentSelectedRow(row);
                      dispatch(openModal());
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
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
  );
}
