import { rightRightApi } from '../../hooks/query/right/right';
import { rightUserApi } from '../../hooks/query/right/user';

export const rightMiddleware = [
    rightUserApi.middleware,
    rightRightApi.middleware,
];