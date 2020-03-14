import { combineReducers, configureStore } from '@reduxjs/toolkit';
import maximReducers from './slice/maxim';

const rootReducer = combineReducers({
  maxims: maximReducers
});

export const store: any = configureStore({
  reducer: rootReducer
});
