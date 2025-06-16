import { createAction } from '@reduxjs/toolkit';
import { IUserToken } from '../../models/rights/userToken';
import { withPayloadType } from '../../services/helper/redux';

export default class AuthActions {
    public static setLoading = createAction('AUTH_SET_LOADING', withPayloadType<boolean>());
    public static setSession = createAction('AUTH_SET_SESSION', withPayloadType<IUserToken | null>());
}
