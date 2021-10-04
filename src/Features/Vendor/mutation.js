import axios from 'axios';

import { baseUrl } from '../../scripts/constants';

export async function restaurants(data) {
  const { name, headers } = data;

  const res = axios.post(
    baseUrl + 'kitchens',

    { name },

    {
      headers,
    },
  );

  return res;
}

export async function items(data) {
  const { items, headers } = data;

  const res = axios.post(
    baseUrl + 'items',

    items,

    {
      headers,
    },
  );

  return res;
}

export async function deleteitem(data) {
  const { itemId, headers } = data;

  const res = axios.delete(`${baseUrl}items/${itemId}`, {
    headers,
  });

  return res;
}