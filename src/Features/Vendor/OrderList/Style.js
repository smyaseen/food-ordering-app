import { Delete } from '@material-ui/icons';
import styled from 'styled-components';
export const OrdersListTitleContainer = styled.div`
  display: flex;

  justify-content: space-between;

  margin: 20px 25px 10px 25px;

  padding: 5px 80px 10px 40px;
`;

export const OrdersListTitle = styled.div`
  color: grey;

  font-size: 25px;

  padding-left: 20px;

  font-weight: 500;
`;

export const DeleteIcon = styled(Delete)`
  color: #ff4d4d;
`;
export const OrdersHistoryTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 20px auto;
`;

export const OrdersHistoryTitle = styled.div`
  color: #717271;
  font-size: 25px;

  font-weight: 500;
`;
