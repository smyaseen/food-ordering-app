import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, mergeMap } from 'rxjs/operators';

import { CREATE_USER, DELETE_USER_BY_ID, FETCH_USERS, FETCH_USER_BY_ID, UPDATE_USER_BY_ID } from './ActionTypes';

export const createUserEpic = (action$, state) =>
  action$.pipe(
    ofType(CREATE_USER),
    mergeMap(({ payload }) => {
      const {
        value: {
          authReducer: {
            accessToken: { token },
          },
        },
      } = state;

      return ajax({
        url: 'http://localhost:4000/v1/users',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: payload,
      }).pipe(
        mergeMap((res) => {
          console.log('response', res.response);
          return of();
        }),
        catchError((error) => {
          return of();
        }),
      );
    }),
  );
export const fetchUsersEpic = (action$, state) =>
  action$.pipe(
    ofType(FETCH_USERS),
    mergeMap(({ payload }) => {
      const {
        value: {
          authReducer: {
            accessToken: { token },
          },
        },
      } = state;
      return ajax({
        url: `http://localhost:4000/v1/users`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }).pipe(
        mergeMap((res) => {
          const users = res.response.filter((user) => user.role === 'user');
          payload(users);
          return of();
        }),
        catchError(() => {
          return of();
        }),
      );
    }),
  );

export const fetchUserByIdEpic = (action$, state) =>
  action$.pipe(
    ofType(FETCH_USER_BY_ID),
    mergeMap(({ payload }) => {
      const {
        value: {
          authReducer: {
            accessToken: { token },
          },
        },
      } = state;

      return ajax({
        url: 'http://localhost:4000/v1/users/' + payload.id,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }).pipe(
        mergeMap((res) => {
          payload.getUserResponseFromEpic(res.response);

          return of();
        }),
        catchError((error) => {
          return of();
        }),
      );
    }),
  );

export const updateUserByIdEpic = (action$, state) =>
  action$.pipe(
    ofType(UPDATE_USER_BY_ID),
    mergeMap(({ payload }) => {
      const {
        value: {
          authReducer: {
            accessToken: { token },
          },
        },
      } = state;

      return ajax({
        url: 'http://localhost:4000/v1/users/' + payload.id,
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: payload.userData,
      }).pipe(
        mergeMap((res) => {
          return of();
        }),
        catchError((error) => {
          return of();
        }),
      );
    }),
  );
export const deleteUserByIdEpic = (action$, state) =>
  action$.pipe(
    ofType(DELETE_USER_BY_ID),
    mergeMap(({ payload }) => {
      const {
        value: {
          authReducer: {
            accessToken: { token },
          },
        },
      } = state;

      return ajax({
        url: 'http://localhost:4000/v1/users/' + payload,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }).pipe(
        mergeMap((res) => {
          return of();
        }),
        catchError((error) => {
          return of();
        }),
      );
    }),
  );
