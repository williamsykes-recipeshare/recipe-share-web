import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { PayloadCreator, ThunkConfig } from '../../models/redux/thunk';

/**
 * Taken from redux toolkit.
 * @returns {(t: T) => {payload : T}}
 */
export function withPayloadType<T>() : (t : T) => { payload : T } {
    return (t : T) : { payload : T } => ({ payload: t });
}

export declare function AppAsyncThunk<Returned = void, ThunkArg = void>(typePrefix : string, payloadCreator : PayloadCreator<Returned, ThunkArg>) : AsyncThunk<Returned, ThunkArg, ThunkConfig>;

export const createAppAsyncThunk : typeof AppAsyncThunk = (typePrefix : string, payloadCreator) => createAsyncThunk(typePrefix, payloadCreator);