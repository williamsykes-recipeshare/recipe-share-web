import { AxiosResponse } from 'axios';
import NotificationActions from './actions';
import { createAppAsyncThunk } from '../../services/helper/redux';

export default class NotificationThunks {
    private static async getMessage(message : {
        defaultMessage : string;
        ex ?: unknown;
    }) : Promise<string> {
        let errorMessage = message.defaultMessage;

        const error = message.ex as string | Error | AxiosResponse<unknown>;
        if (typeof(error) === 'object') {
            if ('data' in error) {
                if (typeof(error.data) === 'string' && error.data) {
                    return error.data;
                }

                if (typeof(error.data) === 'object' && error.data && 'errors' in error.data) {
                    if ('$' in (error.data.errors as Record<string, Array<unknown>>)) {
                        return (error.data.errors as Record<string, Array<unknown>>)['$'][0] as string;
                    }

                    return Object.values((error.data.errors as Record<string, Array<unknown>>))[1][0] as string;
                }

                if (typeof(error.data) === 'object' && error.data && 'errors' in error.data) {
                    return (error.data.errors as Record<string, Array<unknown>>)['$'][0] as string;
                }

                if (typeof(error.data) === 'object' && error.data && 'size' in error.data) {
                    const json = JSON.parse(await (error.data as Blob).text());

                    if ('title' in json)
                        return `${json.title}`;
                }
            }

            if (
                'response' in error &&
                typeof(error.response) === 'object' &&
                error.response &&
                'data' in error.response) {
                return `${error.response.data}`;
            }

            if ('message' in error) {
                errorMessage = error.message;
            }
        } else if (typeof(message.ex) === 'string') {
            errorMessage += ` ${message.ex}`;
        }

        return errorMessage;
    }

    /**
     * Adds an error snackbar to the queue.
     * @param message
     */
    public static showErrorSnackbar = createAppAsyncThunk(
        'general/snackbar/error/show',
        async (message : {
            defaultMessage : string;
            ex ?: unknown;
        }, thunkAPI) => {

            thunkAPI.dispatch(NotificationActions.enqueueSnackbar({
                message: await NotificationThunks.getMessage(message),
                options: {
                    variant: 'error',
                },
            }));
        },
    );

    /**
     * Adds a success snackbar to the queue.
     * @param message
     */
    public static showSuccessSnackbar = createAppAsyncThunk(
        'general/snackbar/success/show',
        async (message : {
            defaultMessage : string;
             ex ?: unknown;
        }, thunkAPI) => {
            thunkAPI.dispatch(NotificationActions.enqueueSnackbar({
                message: await NotificationThunks.getMessage(message),
                options: {
                    variant: 'success',
                },
            }));
        },
    );

    /**
     * Adds a warning snackbar to the queue.
     * @param message
     */
    public static showWarningSnackbar = createAppAsyncThunk(
        'general/snackbar/warning/show',
        async (message : {
            defaultMessage : string;
             ex ?: unknown;
        }, thunkAPI) => {
            thunkAPI.dispatch(NotificationActions.enqueueSnackbar({
                message: await NotificationThunks.getMessage(message),
                options: {
                    variant: 'warning',
                },
            }));
        },
    );
}