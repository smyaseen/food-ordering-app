import React, { useEffect, useState } from 'react';

import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import Snackbar from '../../../../components/AlertMessage';
import { toggleSnackbarOpen } from '../../../../components/AlertMessage/alertRedux/actions';
import CommonGridBasedForm from '../../../../components/CommonGridBasedForm';
import { SELECT, TEXT_FIELD } from '../../../../components/CommonGridBasedForm/FieldTypes';
import { emailRegex } from '../../../../redux/ActionTypes';
import { contactRegex, GetHeader } from '../../../../scripts/constants';
import { validateOnSubmit, fieldChangeHandler } from '../../../../util/CommonGridBasedFormUtils';
import { editUserById } from '../../Common Requests/mutation';
import { FetchUserById } from '../../Common Requests/request';

const EditUser = () => {
  const { headers } = GetHeader();
  const dispatch = useDispatch();
  const history = useHistory();
  const success_message = 'Successfull user has been edited';
  const params = new URLSearchParams(history.location.search);
  const id = params.get('id');
  const [user, setUser] = useState('');
  const [fields, setFields] = useState([
    {
      type: SELECT,
      label: 'Role',
      values: ['user', 'vendor'],
      value: [],
      name: 'role',
      errorMessage: '',
      onChange: ({ target: { value } }, index) => {
        const updatedFields = fieldChangeHandler(fields, value, index);
        setFields(updatedFields);
      },
    },
    {
      type: TEXT_FIELD,
      textFieldType: 'email',
      label: 'Email',
      variant: 'standard',
      value: '',
      name: 'email',
      errorMessage: '',
      onChange: ({ target: { value } }, index) => {
        const updatedFields = fieldChangeHandler(fields, value, index);
        setFields(updatedFields);
      },
      getValidation: (value) => {
        if (!emailRegex.test(value)) {
          return 'Email type is not valid';
        }
        return '';
      },
    },
    {
      type: TEXT_FIELD,
      textFieldType: 'text',
      label: 'Name',
      variant: 'standard',
      value: '',
      name: 'name',
      errorMessage: '',
      onChange: ({ target: { value } }, index) => {
        const updatedFields = fieldChangeHandler(fields, value, index);
        setFields(updatedFields);
      },
    },
    {
      type: TEXT_FIELD,
      textFieldType: 'password',
      label: 'Password',
      variant: 'standard',
      value: '',
      name: 'password',
      errorMessage: '',
      onChange: ({ target: { value } }, index) => {
        const updatedFields = fieldChangeHandler(fields, value, index);
        setFields(updatedFields);
      },
      getValidation: (value) => {
        if (value.length < 8) {
          return 'Password must be 8 characters long';
        }
        return '';
      },
    },
    {
      type: TEXT_FIELD,
      textFieldType: 'text',
      label: 'Contact',
      variant: 'standard',
      value: '',
      name: 'contact',
      errorMessage: '',
      onChange: ({ target: { value } }, index) => {
        const updatedFields = fieldChangeHandler(fields, value, index);
        setFields(updatedFields);
      },
      getValidation: (value) => {
        if (!contactRegex.test(value)) {
          return 'Contact length or Type is not valid';
        }
        return '';
      },
    },
  ]);

  const { data: userById, isFetching } = FetchUserById(id);

  useEffect(() => {
    if (userById !== undefined) {
      setUser(userById);
      fields.map((field) => {
        field.value = userById[field.name];
      });
      setFields(fields);
    }
  }, [userById]);

  const { isLoading, isSuccess, mutateAsync } = useMutation(editUserById, {
    onSuccess: () => {
      const resetFields = fields.map((field) => {
        return {
          ...field,
          value: '',
        };
      });
      setFields(resetFields);
      dispatch(toggleSnackbarOpen(success_message));
    },
    onError: (error) => {
      const {
        response: {
          data: { message },
        },
      } = error;

      dispatch(toggleSnackbarOpen(message));
    },
  });

  const saveHandler = () => {
    const { validateArray, isValid } = validateOnSubmit(fields);
    setFields(validateArray);

    if (isValid) {
      const userData = {};

      fields.map(({ name, value }) => {
        userData[name] = value;
      });

      mutateAsync({ id, headers, userData });
    }
  };

  const buttons = [
    {
      type: 'button',
      name: 'save',
      minWidth: '100%',
      clickHandler: saveHandler,
      isLoading,
    },
  ];

  return (
    <>
      <CommonGridBasedForm buttons={buttons} fields={fields} heading="Edit User" onSaveSuccess={isSuccess} />;
      {isSuccess ? <Snackbar type="success" /> : <Snackbar type="error" />}
    </>
  );
};

export default EditUser;
