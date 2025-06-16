import { isRejected, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import NotificationThunks from '../notification/thunk';
import { AppDispatch, RootState } from '../../models/redux';

export const rtkQueryErrorLogger : Middleware<unknown, RootState, AppDispatch> = (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        api.dispatch(NotificationThunks.showErrorSnackbar({
            defaultMessage: 'Something went wrong',
            ex: action.payload,
        }));
    } else if (isRejected(action)) {
        api.dispatch(NotificationThunks.showErrorSnackbar({
            defaultMessage: 'Something went wrong',
        }));
    }

    return next(action);
};
