import { recipeApi } from '../../hooks/query/recipe/recipe';

export const recipeReducer = {
    [recipeApi.reducerPath]: recipeApi.reducer,
};
