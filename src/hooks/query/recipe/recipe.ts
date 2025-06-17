import { createApi } from '@reduxjs/toolkit/query/react';
import { IRecipe } from '../../../models/recipe/recipe';
import { axiosBaseQuery } from '../../../services/http';

export const recipeApi = createApi({
    reducerPath: 'recipe/recipe',
    tagTypes: ['Recipe'],
    baseQuery: axiosBaseQuery(),

    endpoints: (builder) => ({
        getRecipes: builder.query<Array<IRecipe>, void>({
            query: () => ({
                url: 'api/v1/Recipe/GetList',
                method: 'GET',
            }),
            providesTags: (result) => !result ? [{ type: 'Recipe', id: 'LIST' }] : [
                ...result.map(({ id }) => ({ type: 'Recipe' as const, id })),
                { type: 'Recipe', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetRecipesQuery,
    useLazyGetRecipesQuery,
} = recipeApi;

