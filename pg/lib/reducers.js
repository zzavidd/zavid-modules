import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const textReducer = (state = '', { type, payload }) => {
  switch (type) {
    case 'SET_TEXT':
      return payload || state;
    default:
      return state;
  }
};

const reducers = combineReducers({
  text: textReducer
});

export const store = createStore(
  persistReducer(
    {
      key: 'root',
      storage: storage
    },
    reducers
  )
);
export const persistor = persistStore(store);