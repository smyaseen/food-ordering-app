import React, { useEffect, useState } from 'react';

import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { toggleSnackbarOpen } from '../../../../components/AlertMessage/alertRedux/actions';
import AddEditForm from '../../../../components/CommonGridBasedForm';
import { AUTO_COMPLETE, PRICE, TEXT_FIELD } from '../../../../components/CommonGridBasedForm/FieldTypes';
import { GetHeader } from '../../../../scripts/constants';
import { validateOnSubmit, SelectChangeHandler, fieldChangeHandler } from '../../../../util/CommonGridBasedFormUtils';
import { logout } from '../../../Auth/actions';
import { items } from '../../mutation';
import { FetchCategories, FetchRestaurants } from '../../request';
const AddMenu = () => {
  const { headers } = GetHeader();

  const vendorId = useSelector((state) => {
    const {
      authReducer: { id },
    } = state;
    return id;
  });

  const restaurantsData = FetchRestaurants();
  const categoriesData = FetchCategories();

  useEffect(() => {
    if (restaurantsData !== undefined) {
      saveRestaurant(restaurantsData);
    }
    if (categoriesData !== undefined) {
      saveCategories(categoriesData);
    }
  }, [restaurantsData, categoriesData]);

  const saveRestaurant = (restaurantsDetails) => {
    const resData = restaurantsDetails.map(({ name, id }) => ({ label: name, id }));
    const updatedFields = SelectChangeHandler(fields, resData, 1);

    setFields(updatedFields);
  };

  const saveCategories = (categoriesDetails) => {
    const resData = categoriesDetails.map(({ name, id }) => ({ label: name, id }));

    const updatedFields = SelectChangeHandler(fields, resData, 0);

    setFields(updatedFields);
  };

  const initialItemRestaurant = [
    {
      type: AUTO_COMPLETE,
      label: '',
      values: [],
      placeholder: 'Categories',
      value: '',
      isValid: true,
      errorMessage: '',

      onChange: (event, value) => {
        if (value) {
          setFormFields(fields, value.id, 0);
        } else {
          setFormFields(fields, '', 0);
        }
      },
    },
    {
      type: AUTO_COMPLETE,
      label: '',
      placeholder: 'Restaurants',
      values: [],
      value: '',
      isValid: true,
      errorMessage: '',

      onChange: (event, value) => {
        if (value) {
          setFormFields(fields, value.id, 1);
        } else {
          setFormFields(fields, '', 1);
        }
      },
    },
    {
      type: PRICE,
      label: 'Price',
      value: '',
      isValid: true,
      errorMessage: '',

      onChange: (event, index) => {
        setFormFields(fields, event.target.value, 2);
      },
    },
    {
      type: TEXT_FIELD,
      label: 'Name',
      value: '',
      textFieldType: 'text',
      variant: 'standard',
      isValid: true,
      errorMessage: '',

      onChange: (event, index) => {
        setFormFields(fields, event.target.value, 3);
      },
    },
  ];
  const [fields, setFields] = useState(initialItemRestaurant);

  const setFormFields = (fields, value, index) => {
    const updatedFields = fieldChangeHandler(fields, value, index);

    setFields(updatedFields);
  };

  const saveHandler = () => {
    const { validateArray, isValid } = validateOnSubmit(fields, true);
    setFields(validateArray);

    if (isValid) {
      mutate({
        items: {
          name: fields[3].value,
          price: fields[2].value,
          createdBy: vendorId,
          categoryId: fields[0].value,
          kitchenId: fields[1].value,
        },
        headers,
      });
    }
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const { mutate, isLoading, isSuccess } = useMutation(items, {
    onSuccess: (response) => {
      setFields(initialItemRestaurant);
      return response;
    },
    onError: (err) => {
      if (err.response.status === 401) {
        dispatch(logout({ history }));
        dispatch(toggleSnackbarOpen('Session Expired! Please Log in again.'));
      }
    },
  });

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
      <AddEditForm buttons={buttons} fields={fields} heading="Add Item" onSaveSuccess={isSuccess} />;
    </>
  );
};

export default AddMenu;
