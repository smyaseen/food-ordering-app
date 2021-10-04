import React, { Fragment } from 'react';

import { Grid, Input, Typography } from '@material-ui/core';

import MultipleSelect from '../MultiSelect';
import NumberInput from '../NumberInput';
import SelectTag from '../Select';
import TextField from '../TextField/TextField';
import AutoComplete from './autoComplete';
import { SELECT, MULTI_SELECT, DATE, PRICE, TEXT_FIELD, AUTO_COMPLETE } from './FieldTypes';
import { StyledMainContainerGrid, Error, StyledGridItem, StyledGridColumnItem, StyledFormButton } from './style';

const CommonGridBasedForm = ({ fields, buttons, responseError, heading, onSaveSuccess }) => {
  const WIDTH = '100%';

  const getField = (field, props, index) => {
    switch (field) {
      case SELECT:
        return (
          <SelectTag index={index} onChange={props.onChange} value={props.value} values={props.values} width={WIDTH} />
        );
      case AUTO_COMPLETE:
        return (
          <AutoComplete
            index={index}
            label={props.label}
            onChange={props.onChange}
            placeholder={props.placeholder}
            value={props.value}
            values={props.values}
            width={WIDTH}
          />
        );
      case MULTI_SELECT:
        return (
          <MultipleSelect
            dataArray={props.dataArray}
            index={index}
            onChange={props.onChange}
            value={props.value}
            values={props.values}
            width={WIDTH}
          />
        );

      case DATE:
        return (
          <Input onChange={(e) => props.onChange(e, index)} style={{ width: WIDTH }} type="date" value={props.value} />
        );

      case PRICE:
        return <NumberInput onChange={(e) => props.onChange(e, index)} value={props.value} width={WIDTH} />;

      case TEXT_FIELD:
        return (
          <TextField
            changeHandler={(e) => props.onChange(e, index)}
            disabled={props.disabled}
            type={props.textFieldType}
            value={props.value}
            variant={props.variant}
            width={WIDTH}
          />
        );

      default:
        return null;
    }
  };

  return (
    <StyledMainContainerGrid container direction="column">
      <Grid item>
        <Typography color="primary" variant="h1">
          {heading}
          <hr />
        </Typography>
      </Grid>
      <StyledGridColumnItem item>
        <Grid container direction="row" spacing={3}>
          {fields &&
            fields.map((data, index) => {
              return (
                <Fragment key={index}>
                  <StyledGridItem item xs={6}>
                    <Typography color="secondary" variant="h4">
                      {data.label}
                    </Typography>
                    {getField(data.type, data, index)}
                    <br />
                    <Error>{data.errorMessage}</Error>
                  </StyledGridItem>
                </Fragment>
              );
            })}
        </Grid>
        {buttons?.map(({ clickHandler, minWidth, name, type, isLoading, color }, i) => (
          <div key={name + '-' + i}>
            <StyledFormButton
              key={name + '-' + i}
              color={color}
              fontSize="16px"
              loading={isLoading}
              minwidth={minWidth}
              onClick={clickHandler}
              property={name}
              type={type}
            />
          </div>
        ))}
      </StyledGridColumnItem>
      {responseError && <Error>{responseError}</Error>}

      {onSaveSuccess && <Typography color="secondary">Save Successfull!</Typography>}
    </StyledMainContainerGrid>
  );
};
export default CommonGridBasedForm;
