import { combineReducers } from 'redux';

const textReducer = (state = '', { type, payload }) => {
  switch (type) {
    case 'SET_TEXT':
      return payload || state;
    default:
      return state;
  }
};

export default combineReducers({
  text: textReducer
});
