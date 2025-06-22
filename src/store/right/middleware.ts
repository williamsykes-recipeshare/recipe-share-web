import { rightApi } from '../../hooks/query/right/right';
import { rightUserApi } from '../../hooks/query/right/user';

export const rightMiddleware = [
    rightUserApi.middleware,
    rightApi.middleware,
];