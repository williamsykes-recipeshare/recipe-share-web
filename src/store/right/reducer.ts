import { rightApi } from '../../hooks/query/right/right';
import { rightUserApi } from '../../hooks/query/right/user';

export const rightReducer = {
    [rightUserApi.reducerPath]: rightUserApi.reducer,
    [rightApi.reducerPath]: rightApi.reducer,
};
