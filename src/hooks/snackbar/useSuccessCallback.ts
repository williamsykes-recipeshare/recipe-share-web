import { useCallback } from 'react';
import { useAppDispatch } from '../redux/useAppDispatch';
import NotificationThunks from '../../store/notification/thunk';

const useDisplaySuccessCallback = (defaultMessage : string) : ((message ?: string) => void) => {
    const dispatch = useAppDispatch();

    return useCallback((message ?: string) : void => {
        dispatch(NotificationThunks.showSuccessSnackbar({
            defaultMessage: message ?? defaultMessage,
        }));
    }, [defaultMessage, dispatch]);
};

export default useDisplaySuccessCallback;
