import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootReducer } from '../../store';

export type DispatchCall<P> = (payload : P) => void;
export type DispatchCallEmpty = () => void;

export type RootState = ReturnType<RootReducer>;

export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;
