import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import UserData from '../../Mock/Data';
import CommonCard from './CommonCard';
const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(3),

    marginTop: '50px',
  },
}));

const CardMenu = ({ foodType }) => {
  const classes = useStyles();
  const cart = useSelector((state) => state.addtocartReducers.cart);

  console.log('CART DATA from redux', cart);

  return (
    <div>
      <Grid className={classes.control} container elevation={3} spacing={3}>
        {UserData.map((usedata, index) => {
          const { id, name, type, price, resturantName, img } = usedata;
          if (foodType == type) {
            return (
              <CommonCard
                key={id}
                buttonText="Add to Cart"
                id={id}
                img={img}
                name={name}
                price={price}
                resturantName={resturantName}
              />
            );
          }
        })}
      </Grid>
    </div>
  );
};
export default CardMenu;
