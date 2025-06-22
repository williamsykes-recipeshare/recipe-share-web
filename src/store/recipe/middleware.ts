import { recipeApi } from '../../hooks/query/recipe/recipe';

export const recipeMiddleware = [
    recipeApi.middleware,
];