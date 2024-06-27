import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationState(state, action) {
      return action.payload;
    },
    clearNotificationState(state) {
      return null;
    },
  },
});

export const { setNotificationState, clearNotificationState } =
  notificationSlice.actions;

export const setNotification = (content, duration) => {
  return async (dispatch) => {
    dispatch(setNotificationState(content));
    await new Promise((resolve) => setTimeout(resolve, duration * 1000));
    dispatch(clearNotificationState());
  };
};
export default notificationSlice.reducer;
