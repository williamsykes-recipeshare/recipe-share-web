import { IUserRegistrationFormValue } from '../../models/rights/user';
import { createAppAsyncThunk } from '../../services/helper/redux';
import AuthorisationHttpService from '../../services/http/authorisationHttpService';
import UserHttpService from '../../services/http/rights/userHttpService';
import LocalStorageService from '../../services/localStorageService';
import NotificationThunks from '../notification/thunk';
import AuthActions from './actions';

export default class AuthThunk {
    public static login = createAppAsyncThunk(
        'auth/login',
        async (message : {
            username : string;
            password : string;
        }, thunkAPI) => {
            thunkAPI.dispatch(AuthActions.setLoading(true));

            try {
                const httpResult = await AuthorisationHttpService.login(message.username, message.password);

                if (!httpResult.data) return;

                LocalStorageService.setLocalStorageSession({
                    guid: httpResult.data.guid,
                    value: httpResult.data.token,
                });
                thunkAPI.dispatch(AuthActions.setSession(httpResult.data));

            } catch (ex) {
                thunkAPI.dispatch(NotificationThunks.showErrorSnackbar({
                    defaultMessage: 'Login Error',
                    ex: ex,
                }));
            } finally {
                thunkAPI.dispatch(AuthActions.setLoading(false));
            }
        },
    );

    public static session = createAppAsyncThunk(
        'auth/session',
        async (message, thunkAPI) => {
            try {
                const result = await AuthorisationHttpService.session();

                if (!result.data) return;
                LocalStorageService.setLocalStorageSession({
                    guid: result.data.guid,
                    value: result.data.token,
                });
                thunkAPI.dispatch(AuthActions.setSession(result.data));

                thunkAPI.dispatch(AuthActions.setLoading(false));
            } catch (ex) {
                if (!ex) return;

                thunkAPI.dispatch(NotificationThunks.showErrorSnackbar({
                    defaultMessage: 'Session Error',
                    ex,
                }));
                thunkAPI.dispatch(AuthActions.setLoading(false));
            }
        },
    );

    public static logout = createAppAsyncThunk(
        'auth/logout',
        async (mesage, thunkAPI) => {
            thunkAPI.dispatch(AuthActions.setLoading(true));

            try {
                await AuthorisationHttpService.logout();

                LocalStorageService.setLocalStorageSession(null);
                thunkAPI.dispatch(AuthActions.setSession(null));
            } catch (ex) {
                if (ex) thunkAPI.dispatch(NotificationThunks.showErrorSnackbar({
                    defaultMessage: 'Logout Error',
                    ex,
                }));
            } finally {
                thunkAPI.dispatch(AuthActions.setLoading(false));
            }
        },
    );

    public static register = createAppAsyncThunk(
        'auth/register',
        async (message : IUserRegistrationFormValue, thunkAPI) => {
            thunkAPI.dispatch(AuthActions.setLoading(true));

            try {
                await UserHttpService.register(message);

                thunkAPI.dispatch(NotificationThunks.showSuccessSnackbar({
                    defaultMessage: 'Success.',
                }));

                // Since we don't do any email validation, we can immediately sign users in after registration
                thunkAPI.dispatch(AuthThunk.login({
                    username: message.email,
                    password: message.password,
                }));

            } catch (ex) {
                thunkAPI.dispatch(NotificationThunks.showErrorSnackbar({
                    defaultMessage: 'Registration Error',
                    ex: ex,
                }));
            } finally {
                thunkAPI.dispatch(AuthActions.setLoading(false));
            }
        },
    );
}
