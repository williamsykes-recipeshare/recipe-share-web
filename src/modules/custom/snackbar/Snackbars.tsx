import React, { useCallback, useEffect } from 'react';
import { useAppSelector } from '../../../hooks/redux/useAppSelector';
import { ISnackbarNotification } from '../../../models/notification';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '../../../hooks/redux/useAppDispatch';
import { IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import GeneralActions from '../../../store/notification/actions';

const Snackbars = () : React.JSX.Element => {
    const dispatch = useAppDispatch();
    const [displayed, setDisplayed] = React.useState<Array<number>>([]);
    const snackbar = useSnackbar();
    const notifications = useAppSelector<Array<ISnackbarNotification>>(x => x.notification.notifications);

    const onCloseClick = useCallback((event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        snackbar.closeSnackbar(event.currentTarget.value);
    }, [snackbar]);

    useEffect(() => {
        notifications
            .filter(x => !displayed.includes(x.key)).forEach((notification) => {
                // Display snackbar using notistack
                snackbar.enqueueSnackbar(notification.message, {
                    key: `snackbar_${notification.key}`,
                    action: <IconButton color='inherit' value={`snackbar_${notification.key}`} onClick={onCloseClick}>
                        <CloseIcon color='inherit' />
                    </IconButton>,
                    ...notification.options,
                });
                // Keep track of snackbars that we've displayed
                setDisplayed([...displayed, notification.key]);
                // Dispatch action to remove snackbar from redux store
                dispatch(GeneralActions.removeSnackbar(notification.key));
            });

    }, [notifications, displayed, snackbar, onCloseClick, dispatch]);

    return (
        <div />
    );
};

export default Snackbars;