import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';

import CustomTable from '../../../components/CustomTable';
import { OrdersHistoryTitleContainer, DeleteIcon, OrdersHistoryTitle } from './Style';
export const ordersHistoryList = [
  {
    No: 1,
    name: 'Adnan',
    contact: '13131232',
    items: 'roti, keema',
    price: 'Rs 250',
    date: '25-9-2021',
  },
  {
    No: 2,
    name: 'Yousuf',
    contact: '13131232',
    items: 'roti, karhai',
    price: 'Rs 200',
    date: '25-9-2021',
  },
  {
    No: 3,
    name: 'Baber',
    contact: '1309232',
    items: 'burger',
    price: 'Rs 350',
    date: '24-9-2021',
  },
  {
    No: 4,
    name: 'Dilawer',
    contact: '23131232',
    items: 'biryani, coldrink',
    price: 'Rs 200',
    date: '24-9-2021',
  },
  {
    No: 5,
    name: 'Naem',
    contact: '10901232',
    items: 'biryani',
    price: 'Rs 150',
    date: '23-9-2021',
  },
  {
    No: 6,
    name: 'Kashif',
    contact: '13131232',
    items: 'karhai, coldrink, roti',
    price: 'Rs 450',
    date: '23-9-2021',
  },
  {
    No: 7,
    name: 'Dilawer',
    contact: '13131232',
    items: 'biryani, coldrink, salad',
    price: 'Rs 400',
    date: '22-9-2021',
  },
];
function OrdersList() {
  const editDelete = (
    <>
      <IconButton>
        <Edit />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </>
  );
  const header = ['No', 'Name', 'Contact', 'Items', 'Price', 'Date'];
  return (
    <>
      <OrdersHistoryTitleContainer>
        <OrdersHistoryTitle>Orders</OrdersHistoryTitle>
      </OrdersHistoryTitleContainer>
      <CustomTable header={header} rows={ordersHistoryList} tablewidth="80%" />
    </>
  );
}
export default OrdersList;
