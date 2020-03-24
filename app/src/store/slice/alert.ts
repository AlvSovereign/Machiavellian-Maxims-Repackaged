import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AlertState = {
  alerts: []
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<AlertInterface>) => {
      return (state = { alerts: [...state.alerts, action.payload] });
    },
    removeAlert: (state, action: PayloadAction<AlertInterface>) => {
      const filteredAlerts = state.alerts.filter(
        alert => alert.id !== action.payload.id
      );

      return (state = { alerts: filteredAlerts });
    }
  }
});

export const { addAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;

export interface AlertInterface {
  autoDismiss?: number;
  id: number;
  message?: string;
  type?: 'error';
}

export interface AlertState {
  alerts: AlertInterface[];
}
