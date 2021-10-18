import axios from 'axios';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { toggleSnackbarOpen } from '../../../components/AlertMessage/alertRedux/actions';
import { baseUrl, ERROR, GetHeader, SUCCESS } from '../../../scripts/constants';
import { logout } from '../../Auth/actions';

export const EditBalanceById = () => {
  const history = useHistory();
  const { headers } = GetHeader();
  const dispatch = useDispatch();
  const successMessage = 'Successfull balance has been updated';
  return useMutation(
    async ({ id, data }) => {
      const response = await axios.patch(baseUrl() + 'balance/' + id, data, {
        headers,
      });
      return response;
    },

    {
      onSuccess: () => {
        // success!
        dispatch(
          toggleSnackbarOpen({
            snackbarMessage: successMessage,
            messageType: SUCCESS,
          }),
        );
      },
      onError: (error) => {
        const {
          response: {
            data: { message },
          },
        } = error;
        if (error.response.status === 401) {
          dispatch(logout({ history }));
          dispatch(
            toggleSnackbarOpen({ snackbarMessage: 'Session Expired! Please Log in again.', messageType: ERROR }),
          );
        } else {
          dispatch(toggleSnackbarOpen({ snackbarMessage: message, messageType: ERROR }));
        }
      },
    },
  );
};

export const DeleteBalanceById = () => {
  const history = useHistory();
  const { headers } = GetHeader();
  const successMessage = 'Successfull balacne has been deleted';
  const dispatch = useDispatch();
  return useMutation(
    async (id) => {
      const response = await axios.delete(baseUrl() + 'balance/' + id, {
        headers,
      });
      return response;
    },

    {
      onError: (error) => {
        const {
          response: {
            data: { message },
          },
        } = error;
        if (error.response.status === 401) {
          dispatch(logout({ history }));
          dispatch(
            toggleSnackbarOpen({ snackbarMessage: 'Session Expired! Please Log in again.', messageType: ERROR }),
          );
        } else {
          dispatch(toggleSnackbarOpen({ snackbarMessage: message, messageType: ERROR }));
        }
      },
      onSuccess: () => {
        dispatch(
          toggleSnackbarOpen({
            snackbarMessage: successMessage,
            messageType: SUCCESS,
          }),
        );
      },
    },
  );
};
