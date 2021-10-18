import axios from 'axios';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { toggleSnackbarOpen } from '../../components/AlertMessage/alertRedux/actions';
import { ERROR, GetHeader } from '../../scripts/constants';
import { baseUrl } from '../../scripts/constants';
import { logout } from '../Auth/actions';

const Restaurants = async (headers) => {
  const { data } = await axios.get(baseUrl() + 'kitchens', {
    headers,
  });

  return data;
};

export const FetchRestaurants = () => {
  const { headers } = GetHeader();
  const { data } = useQuery('restaurants', () => Restaurants(headers));

  return data;
};

const Categories = async (headers) => {
  const { data } = await axios.get(baseUrl() + 'categories', {
    headers,
  });
  return data;
};

export const FetchCategories = () => {
  const { headers } = GetHeader();
  const dispatch = useDispatch();
  const history = useHistory();
  const { data } = useQuery('categories', () => Categories(headers), {
    onSuccess: () => {},
    onError: (error) => {
      const {
        response: {
          data: { message },
        },
      } = error;
      if (error.response.status === 401) {
        dispatch(logout({ history }));
        dispatch(toggleSnackbarOpen({ snackbarMessage: 'Session Expired! Please Log in again.', messageType: ERROR }));
      } else {
        dispatch(toggleSnackbarOpen({ snackbarMessage: message, messageType: ERROR }));
      }
    },
  });
  return data;
};

const Items = async (headers) => {
  const res = await axios.get(baseUrl() + 'items', {
    headers,
  });

  return res;
};

export const FetchItems = () => {
  const { headers } = GetHeader();

  return useQuery('items', () => Items(headers));
};

const ItemsById = async (headers, id) => {
  const { data } = await axios.get(baseUrl() + 'items/' + id, {
    headers,
  });

  return data;
};
export const FetchItemsById = (id) => {
  const { headers } = GetHeader();

  return useQuery('fetchItems', () => ItemsById(headers, id));
};
const orderHistory = async (vendorId) => {
  const { data: orders } = await axios.get(baseUrl() + 'orders/vendor/' + vendorId);
  const structuredData = [];

  orders.map(({ items, userId, status, amount, id }) => {
    const itemsArray = [];

    items.map((item) => {
      const parseItem = JSON.parse(item);

      itemsArray.push(parseItem);
    });

    structuredData.push({
      id,
      name: userId.name,
      items: itemsArray,

      status,
      price: amount,
    });
  });
  return structuredData;
};
export const FetchOrderHistory = () => {
  const vendorId = useSelector((state) => {
    const {
      authReducer: { id },
    } = state;
    return id;
  });

  return useQuery('orders', () => orderHistory(vendorId));
};

const orderById = async (id) => {
  const { data } = await axios.get(baseUrl() + 'orders/' + id);
  return data;
};

export const FetchOrderById = (id) => {
  return useQuery(['ordersById', id], () => orderById(id));
};
