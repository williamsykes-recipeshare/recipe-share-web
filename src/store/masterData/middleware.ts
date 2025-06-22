import { dietaryTagApi } from '../../hooks/query/masterData/dietaryTag';
import { ingredientApi } from '../../hooks/query/masterData/ingredient';

export const masterDataMiddleware = [
    dietaryTagApi.middleware,
    ingredientApi.middleware,
];