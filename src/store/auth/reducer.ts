import { createReducer } from '@reduxjs/toolkit';
import { IUserToken } from '../../models/rights/userToken';
import AuthActions from './actions';

export interface IAuthState {
    isLoading : boolean;
    session : IUserToken | null;
}

const initialState : IAuthState = {
    isLoading: true,
    session: null,
};

const authReducer = createReducer<IAuthState>(initialState, builder => 
    builder.addCase(AuthActions.setLoading, (state, action) => {
        state.isLoading = action.payload;
    }).addCase(AuthActions.setSession, (state, action) => {
        state.session = action.payload;
    }),
);

export default authReducer;