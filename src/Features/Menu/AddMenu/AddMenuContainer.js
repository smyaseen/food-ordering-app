import React from 'react';

import 'date-fns';
import { Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import CommonButton from '../../../components/Button/Button';

const useStyles = makeStyles(() => ({
  paper: {
    position: 'absolute',
    width: 400,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    backgroundColor: 'white',

    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
  header: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#e91e63',
    margin: '20px 0',
  },
  form: {
    margin: '0px 20px',
  },
  txtField: {
    width: '100%',
  },
  button: {
    margin: '20px 0',
    textAlign: 'center',
  },
  crossIcon: {
    textAlign: 'right',
    paddingRight: '20px',
    cursor: 'pointer',
  },
  formField: {
    marginBottom: '10px',
  },
}));

function AddMenuContainer(props) {
  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <div className={classes.header}>
        <div className={classes.crossIcon} onClick={() => props.openModal(false)}>
          <CloseIcon />
        </div>
        <h2>Add Menu</h2>
      </div>
      <div className={classes.form}>
        <div className={classes.formField}>
          <TextField className={classes.txtField} label="Menu Name" />
        </div>
        <div className={classes.formField}>
          <TextField className={classes.txtField} label="Price" />
        </div>
        <div className={classes.formField}>
          <TextField className={classes.txtField} label="Category" />
        </div>
        <div className={classes.formField}>
          <TextField className={classes.txtField} label="Restraunt" />
        </div>

        <div className={classes.button}>
          <CommonButton fontSize="14px" minwidth="100px" property="Add Menu" />
        </div>
      </div>
    </div>
  );
  //   onClose={openModal}
  return (
    <div>
      <Modal aria-describedby="simple-modal-description" aria-labelledby="simple-modal-title" open={props.isModalOpen}>
        {body}
      </Modal>
    </div>
  );
}
export default AddMenuContainer;
