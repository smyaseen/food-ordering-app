import axios from 'axios';

import { baseUrl } from '../../../scripts/constants';
export async function category(data) {
  const { category, headers } = data;
  console.log('headers', headers);
  const res = axios.post(
    baseUrl + 'categories',

    category,
    {
      headers,
    },
  );

  return res;
}

export async function deleteCategory(data) {
  const { categoryId, headers } = data;
  console.log('id', categoryId);
  // console.log('headers', headers);

  const res = axios.delete(`${baseUrl}categories/${categoryId}`, {
    headers,
  });

  return res;
}
export async function updateCategoryById(data) {
  const {
    category,
    categoriesId: { id },
    token: { token },
  } = data;

  const res = axios.patch(`${baseUrl}categories/${id}`, category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}
