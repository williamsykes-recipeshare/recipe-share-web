import { useCallback, useEffect } from 'react';
import LocalStorageService from '../../services/localStorageService';
import AuthActions from '../../store/auth/actions';
import AuthThunk from '../../store/auth/thunk';
import { useAppDispatch } from '../redux/useAppDispatch';
import useAxiosHttpInitializeInterceptor from '../axios/useHttpInitializeInterceptor';

const useSession = () : void=> {
    const dispatch = useAppDispatch();

    useAxiosHttpInitializeInterceptor();

    const getSession = useCallback(async () : Promise<void> => {
        const localSession = await LocalStorageService.getLocalStorageSession();

        if (localSession) {
            dispatch(AuthThunk.session());
        } else {
            dispatch(AuthActions.setLoading(false));
        }
    }, [dispatch]);

    useEffect(() => {
        getSession();
    }, [getSession]);
};

export default useSession;