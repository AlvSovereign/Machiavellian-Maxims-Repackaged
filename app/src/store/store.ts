import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createIdbStorage from '@piotr-cz/redux-persist-idb-storage/src';
import alertReducers, { AlertState } from 'store/slice/alert';
import appReducers, { AppState } from 'store/slice/app';
import formsReducers, { FormsState } from 'store/slice/forms';
import maximReducers, { MaximState } from 'store/slice/maxim';
import meReducers, { MeState } from 'store/slice/me';

const rootReducer = combineReducers({
  alert: alertReducers,
  app: appReducers,
  forms: formsReducers,
  maxim: maximReducers,
  me: meReducers
});

const rootPersistConfig = {
  key: 'root',
  storage: createIdbStorage({
    name: 'maxims',
    storeName: 'maxim'
  }),
  blacklist: ['alert', 'forms'],
  version: 1
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store: any = configureStore({
  reducer: persistedReducer
});

const persistor = persistStore(store);

export { persistor, store };

export interface RootStateInterface {
  app: AppState;
  alert: AlertState;
  forms: FormsState;
  maxim: MaximState;
  me: MeState;
}

export type AppThunk = ThunkAction<void, any, unknown, Action<string>>;
