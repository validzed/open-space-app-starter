import api from '../../utils/api';
import { receiveTalksActionCreator } from '../talks/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndTalks() {
  return async (dispatch) => {
    try {
      const talks = await api.getAllTalks();
      const users = await api.getAllUsers();

      dispatch(receiveTalksActionCreator(talks));
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { asyncPopulateUsersAndTalks };
