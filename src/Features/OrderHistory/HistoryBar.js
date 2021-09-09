import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
// eslint-disable-next-line import/order
import DateFnsUtils from '@date-io/date-fns';
// eslint-disable-next-line import/order
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// eslint-disable-next-line import/order
import { Button } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  label: {
    display: 'flex',
  },
  btn: {
    backgroundColor: '#e91e63',
    color: 'white',
  },
}));

const HistoryBar = () => {
  const classes = useStyles();
  return (
    <>
      <SearchBar />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          format="MM/dd/yyyy"
          id="date-picker-dialog"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          label="Order Date From"
          margin="normal"
        />
        <KeyboardDatePicker
          format="MM/dd/yyyy"
          id="date-picker-dialog"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          label="Until"
          margin="normal"
        />
      </MuiPickersUtilsProvider>

      <Button className={classes.btn}>Filter Now</Button>
    </>
  );
};

export default HistoryBar;
