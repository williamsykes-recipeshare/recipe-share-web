import { INotification, ISnackbarNotification } from '../../models/notification';
import { withPayloadType } from '../../services/helper/redux';
import { createAction } from '@reduxjs/toolkit';

export default class NotificationActions {
    public static enqueueSnackbar = createAction('ENQUEUE_SNACKBAR', (notification : INotification) => {
        return {
            payload: {
                key: new Date().getTime() + Math.random(),
                ...notification,
            } as ISnackbarNotification,
        };
    });

    public static removeSnackbar = createAction('REMOVE_SNACKBAR', withPayloadType<number>());
}