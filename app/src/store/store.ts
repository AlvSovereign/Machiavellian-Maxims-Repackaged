import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createIdbStorage from '@piotr-cz/redux-persist-idb-storage/src';
import appReducers, { AppState } from 'store/slice/app';
import maximReducers, { MaximState } from 'store/slice/maxim';
import userReducers, { UserState } from 'store/slice/user';

const rootReducer = combineReducers({
  app: appReducers,
  maxim: maximReducers,
  user: userReducers
});

const persistConfig = {
  key: 'root',
  storage: createIdbStorage({ name: 'maxims', storeName: 'maxim' }),
  version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: any = configureStore({
  reducer: persistedReducer
});

const persistor = persistStore(store);

export { persistor, store };

export interface RootStateInterface {
  app: AppState;
  maxim: MaximState;
  user: UserState;
}

export type AppThunk = ThunkAction<void, any, unknown, Action<string>>;
