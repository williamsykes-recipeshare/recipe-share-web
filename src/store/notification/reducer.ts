import { createReducer } from '@reduxjs/toolkit';
import NotificationActions from './actions';
import { ISnackbarNotification } from '../../models/notification';

export interface INotificationState {
    notifications : Array<ISnackbarNotification>;
}

const initialState : INotificationState = {
    notifications: [],
};

const notificationReducer = createReducer<INotificationState>(initialState, builder => 
    builder.addCase(NotificationActions.enqueueSnackbar, (state, action) => {
        state.notifications = [action.payload, ...state.notifications];
    }).addCase(NotificationActions.removeSnackbar, (state, action) => {
        state.notifications.filter(notification => notification.key !== action.payload);
    }),
);

export default notificationReducer;
