import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';

import CommonButton from '../../../components/Button/Button';
import CustomTable from '../../../components/CustomTable';
import { userList } from '../../../Mock/UserList';
import { UsersTitleContainer, UsersTitle, DeleteIcon } from './style';
function UsersList() {
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
  const header = ['Id', 'Name', 'Email', 'Contact', 'Edit'];
  return (
    <>
      <UsersTitleContainer>
        <UsersTitle>Users</UsersTitle>
        <CommonButton property="Add Users" />
      </UsersTitleContainer>

      <CustomTable editDelete={editDelete} header={header} rows={userList} tablewidth="80%" />
    </>
  );
}

export default UsersList;