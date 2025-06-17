import { recipeApi } from '../../hooks/query/recipe/recipe';
import { rightApi } from '../../hooks/query/right/right';
import { rightUserApi } from '../../hooks/query/right/user';

export const rightReducer = {
    // Rights
    [rightUserApi.reducerPath]: rightUserApi.reducer,
    [rightApi.reducerPath]: rightApi.reducer,

    // Recipes
    [recipeApi.reducerPath]: recipeApi.reducer,

    // Master Data
};
