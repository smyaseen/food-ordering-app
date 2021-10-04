import React, { useState, useEffect } from 'react';

import { Collapse } from '@material-ui/core';

import CommonButton from '../Button/Button';
import BasicTextFields from '../TextField/TextField';
import {
  FormHeading,
  ForgotPassword,
  Form,
  FormContainer,
  InputBox,
  Label,
  BasicLink,
  Error,
  GridContainer,
  GridItem,
  NavTitle,
  NisumText,
  NisumTextColor,
  ErrorRespose,
} from './styles';

const FormComponent = ({
  inputFields,
  basicButtons,
  formTitle,
  forgotPassword,
  label,
  navigationPath,
  changeHandler,
  responseError,
}) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <>
      <NavTitle elevation={0}>
        <NisumText>
          Ni<NisumTextColor>sum</NisumTextColor>
        </NisumText>
      </NavTitle>
      <FormContainer>
        <GridContainer>
          <GridItem>
            <Collapse in={checked} timeout={1000}>
              <Form elevation={10}>
                <FormHeading>{formTitle}</FormHeading>
                <ErrorRespose>{responseError}</ErrorRespose>
                {inputFields.map(({ required, label, name, type, value, errorMessage }, i) => (
                  <InputBox key={name + '-' + i} className="inputFields">
                    <BasicTextFields
                      key={name + '-' + i}
                      changeHandler={(e) => changeHandler(e, i)}
                      label={label}
                      name={name}
                      required={required}
                      type={type}
                      value={value}
                      width="100%"
                    />
                    <Error>{errorMessage}</Error>
                  </InputBox>
                ))}
                {basicButtons.button.map(({ clickHandler, minWidth, name, type, isLoading }, i) => (
                  <div key={name + '-' + i}>
                    <CommonButton
                      key={name + '-' + i}
                      fontSize="16px"
                      loading={isLoading}
                      minwidth={minWidth}
                      onClick={clickHandler}
                      property={name}
                      type={type}
                    />
                  </div>
                ))}

                <BasicLink>
                  <Label to={navigationPath}>{label}</Label>

                  <ForgotPassword to="/forget-password">{forgotPassword}</ForgotPassword>
                </BasicLink>
              </Form>
            </Collapse>
          </GridItem>
        </GridContainer>
      </FormContainer>
    </>
  );
};

export default FormComponent;
