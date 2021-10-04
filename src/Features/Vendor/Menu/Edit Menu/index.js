import React, { useState } from 'react';

import AddEditForm from '../../../../components/CommonGridBasedForm';
import { PRICE, SELECT, TEXT_FIELD } from '../../../../components/CommonGridBasedForm/FieldTypes';
import { validateOnSubmit } from '../../../../util/CommonGridBasedFormUtils';

const EditMenu = () => {
  const [onSaveSuccess, setOnSaveSuccess] = useState(false);

  const [category, setCategory] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [price, setPrice] = useState(30);
  const [name, setName] = useState();
  const [fields, setFields] = useState([
    {
      type: SELECT,
      label: 'Categories',
      values: ['Bread', 'Gravy'],
      value: category,
      isValid: true,
      errorMessage: '',

      onChange: (event, index) => {
        setCategory(event.target.value);
        fields[index].value = event.target.value;
      },
    },
    {
      type: SELECT,
      label: 'Restaurant',
      values: ['KFC', 'DOMINOS', 'DARBAR'],
      value: restaurant,
      isValid: true,
      errorMessage: '',

      onChange: (event, index) => {
        setRestaurant(event.target.value);
        fields[index].value = event.target.value;
      },
    },
    {
      type: PRICE,
      label: 'Price',
      value: price,
      isValid: true,
      errorMessage: '',

      onChange: (event, index) => {
        setPrice(event.target.value);
        fields[index].value = event.target.value;
      },
    },
    {
      type: TEXT_FIELD,
      label: 'Name',
      value: name,
      textFieldType: 'text',
      variant: 'standard',
      isValid: true,
      errorMessage: '',

      onChange: (event, index) => {
        setName(event.target.value);
        fields[index].value = event.target.value;
      },
    },
  ]);

  const saveHandler = () => {
    const { validateArray, isValid } = validateOnSubmit(fields);
    setFields(validateArray);
    isValid ? setOnSaveSuccess(true) : setOnSaveSuccess(false);
  };
  const buttons = [
    {
      type: 'button',
      name: 'save',
      minWidth: '100%',
      clickHandler: saveHandler,
    },
  ];

  return <AddEditForm buttons={buttons} fields={fields} heading="Edit Item" onSaveSuccess={onSaveSuccess} />;
};

export default EditMenu;
