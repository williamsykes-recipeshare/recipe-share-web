import axios from 'axios';
import { useEffect } from 'react';
import NotificationThunks from '../../store/notification/thunk';
import { useAppDispatch } from '../redux/useAppDispatch';
import LocalStorageService from '../../services/localStorageService';
import AuthActions from '../../store/auth/actions';

const useAxiosHttpInitializeInterceptor = () : null => {
    axios.defaults.baseURL = API_URL;
    const dispatch = useAppDispatch();

    useEffect(() => {
        const requestInterceptorNum = axios.interceptors.request.use(async (config) => {
            const token = await LocalStorageService.getLocalStorageSession();

            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token.value;
            }
            return config;
        });

        const responseInterceptorNum = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (axios.isCancel(error)) {
                    return Promise.reject();
                }

                if (!!error.response && error.response.status === 401) {
                    LocalStorageService.setLocalStorageSession(null);
                    dispatch(AuthActions.setSession(null));
                    return Promise.reject(error.response);
                } else if (!!error.response && error.response.status === 403) {
                    return Promise.reject(error.response);
                }

                if (!error?.response) {
                    dispatch(NotificationThunks.showErrorSnackbar({
                        defaultMessage: 'Connection Error.',
                    }));
                    return Promise.reject();
                }

                return Promise.reject(error.response);
            });

        return () : void => {
            axios.interceptors.request.eject(requestInterceptorNum);
            axios.interceptors.response.eject(responseInterceptorNum);
        };
    }, [dispatch]);

    return null;
};

export default useAxiosHttpInitializeInterceptor;