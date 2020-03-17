import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createIdbStorage from '@piotr-cz/redux-persist-idb-storage/src';
import maximReducers, { MaximState } from './slice/maxim';

const rootReducer = combineReducers({
  maxims: maximReducers
});

const persistConfig = {
  key: 'root',
  storage: createIdbStorage({ name: 'maxim', storeName: 'maxims' }),
  version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: any = configureStore({
  reducer: persistedReducer
});

const persistor = persistStore(store);

export { persistor, store };

export interface RootStateInterface {
  maxims: MaximState;
}
