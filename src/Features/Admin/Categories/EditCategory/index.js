import React, { useState } from 'react';
import { useEffect } from 'react';

import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import CommonGridBasedForm from '../../../../components/CommonGridBasedForm';
import { TEXT_FIELD } from '../../../../components/CommonGridBasedForm/FieldTypes';
import Loader from '../../../../components/Loader';
import { GetHeader } from '../../../../scripts/constants';
import { validateOnSubmit, fieldChangeHandler } from '../../../../util/CommonGridBasedFormUtils';
import { updateCategoryById } from '../mutation';
import { FetchCategoriesById } from '../request';

const EditCategory = () => {
  const { headers } = GetHeader();
  const adminId = useSelector((state) => {
    const {
      authReducer: { id },
    } = state;
    return id;
  });

  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const id = params.get('id');
  const { data: categoriesId, refetch, isFetching } = FetchCategoriesById(id);
  const [categories, setCategoriesId] = useState([]);

  useEffect(() => {
    if (categoriesId !== undefined) {
      saveCategoriesId(categoriesId);
    }
  }, [categoriesId]);

  const saveCategoriesId = (categoriesId) => {
    const { name } = categoriesId;

    fields[0].value = name;
    setFields(fields);
    setCategoriesId(name);
  };
  const [fields, setFields] = useState([
    {
      type: TEXT_FIELD,
      textFieldType: 'text',
      label: 'Category Name',
      variant: 'standard',
      value: '',
      errorMessage: '',
      onChange: ({ target: { value } }, index) => {
        const updatedFields = fieldChangeHandler(fields, value, index);
        setFields(updatedFields);
      },
    },
  ]);

  const saveHandler = () => {
    const { validateArray, isValid } = validateOnSubmit(fields);
    setFields(validateArray);

    if (isValid) {
      const name = fields.map(({ value }, index) => value);
      mutate({
        category: {
          name: name[0],
          createdBy: adminId,
        },
        headers,
        categoriesId,
      });
    }
  };

  const buttons = [
    {
      type: 'button',
      name: 'save',
      minWidth: '100%',
      clickHandler: saveHandler,
    },
  ];

  const { mutate, mutateAsync, isLoading, isSuccess } = useMutation(updateCategoryById, {
    onSuccess: (response) => {
      const resetFields = fields.map((field) => {
        return { ...field, value: '' };
      });
      setFields(resetFields);
      return response;
    },
  });

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <CommonGridBasedForm
          buttons={buttons}
          fields={fields}
          heading="Edit Category"
          loading={isLoading}
          onSaveSuccess={isSuccess}
        />
      )}
    </>
  );
};

export default EditCategory;
