import { useCallback, useRef } from 'react';
import { useAppDispatch } from '../redux/useAppDispatch';
import NotificationThunks from '../../store/notification/thunk';

const useDebouncedDisplayWarningCallback = (defaultMessage : string) : ((message ?: string) => void) => {
    const dispatch = useAppDispatch();
    const lastWarningTimeRef = useRef<number>(0); // Track last warning timestamp

    return useCallback((message ?: string) => {
        const now = Date.now();

        // Prevent spamming by allowing a warning only every 2 seconds
        if (now - lastWarningTimeRef.current < 2000) {
            return;
        }

        lastWarningTimeRef.current = now;

        dispatch(NotificationThunks.showWarningSnackbar({
            defaultMessage: message ?? defaultMessage,
        }));
    }, [defaultMessage, dispatch]);
};

export default useDebouncedDisplayWarningCallback;
