import React, { useState } from 'react';

import { useMutation } from 'react-query';

import CommonGridBasedForm from '../../../../components/CommonGridBasedForm';
import { TEXT_FIELD } from '../../../../components/CommonGridBasedForm/FieldTypes';
import { AuthToken } from '../../../../scripts/constants';
import { validateOnSubmit } from '../../../../util/CommonGridBasedFormUtils';
import { restaurants } from '../../mutation';
const AddRestaurant = () => {
  const token = AuthToken();

  const [onSaveSuccess, setOnSaveSuccess] = useState(false);

  const [restaurant, setRestaurant] = useState('');
  // useEffect(() => {}, [buttons.button]);
  const [fields, setFields] = useState([
    {
      type: TEXT_FIELD,
      textFieldType: 'text',
      label: 'Restaurant Name',
      variant: 'standard',
      value: restaurant,
      isValid: true,
      errorMessage: '',
      onChange: (event, index) => {
        setRestaurant(event.target.value);
        fields[index].value = event.target.value;
      },
    },
  ]);
  // const token = AuthToken();
  const saveHandler = () => {
    const { validateArray, isValid } = validateOnSubmit(fields);
    setFields(validateArray);

    if (isValid) {
      setOnSaveSuccess(true);
      const name = fields.map(({ value }) => value);

      mutate({ name: name[0], token });
    } else {
      setOnSaveSuccess(false);
    }
  };

  const buttons = {
    button: [
      {
        type: 'button',
        name: 'save',
        minWidth: '100%',
        clickHandler: saveHandler,
      },
    ],
  };
  const { mutate, mutateAsync, error, isLoading, isSuccess } = useMutation(restaurants, {
    onSuccess: (response) => {
      return response;
    },
  });

  //

  return (
    <>
      <CommonGridBasedForm
        buttons={buttons}
        fields={fields}
        heading="Add Restaurant"
        loading={isLoading}
        onSaveSuccess={isSuccess}
      />
    </>
  );
};

export default AddRestaurant;
