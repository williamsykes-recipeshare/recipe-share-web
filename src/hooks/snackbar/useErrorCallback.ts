import { useCallback } from 'react';
import { useAppDispatch } from '../redux/useAppDispatch';
import NotificationThunks from '../../store/notification/thunk';

const useDisplayErrorCallback = (defaultMessage : string) : ((ex ?: Error | unknown) => void) => {
    const dispatch = useAppDispatch();

    return useCallback((error ?: Error | unknown) : void => {
        if (!error) return;
        dispatch(NotificationThunks.showErrorSnackbar({
            defaultMessage,
            ex: error,
        }));
    }, [defaultMessage, dispatch]);
};

export default useDisplayErrorCallback;
