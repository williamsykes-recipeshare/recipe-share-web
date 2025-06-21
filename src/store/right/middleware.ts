import { dietaryTagApi } from '../../hooks/query/masterData/dietaryTag';
import { ingredientApi } from '../../hooks/query/masterData/ingredient';
import { recipeApi } from '../../hooks/query/recipe/recipe';
import { rightApi } from '../../hooks/query/right/right';
import { rightUserApi } from '../../hooks/query/right/user';

export const rightMiddleware = [
    // Rights
    rightUserApi.middleware,
    rightApi.middleware,

    // Recipes
    recipeApi.middleware,

    // Master Data
    dietaryTagApi.middleware,
    ingredientApi.middleware,
];