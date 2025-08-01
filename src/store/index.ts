import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import notificationReducer from './notification/reducer';
import authReducer from './auth/reducer';
import { rtkQueryErrorLogger } from './middleware/rtkQueryErrorLogger';
import { rightMiddleware } from './right/middleware';
import { rightReducer } from './right/reducer';
import { masterDataReducer } from './masterData/reducer';
import { recipeReducer } from './recipe/reducer';
import { masterDataMiddleware } from './masterData/middleware';
import { recipeMiddleware } from './recipe/middleware';

export const rootReducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    ...rightReducer,
    ...masterDataReducer,
    ...recipeReducer,
});

export type RootReducer = typeof rootReducer;

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(rightMiddleware)
        .concat(masterDataMiddleware)
        .concat(recipeMiddleware)
        .concat(rtkQueryErrorLogger),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;