import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface ThunkConfig {
    state : RootState;
}

export type PayloadCreator<Returned, ThunkArg> = AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkConfig>;