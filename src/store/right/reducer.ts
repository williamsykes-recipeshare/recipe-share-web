import { rightRightApi } from '../../hooks/query/right/right';
import { rightUserApi } from '../../hooks/query/right/user';

export const rightReducer = {
    // Add the generated reducer as a specific top-level slice
    [rightUserApi.reducerPath]: rightUserApi.reducer,
    [rightRightApi.reducerPath]: rightRightApi.reducer,
};
