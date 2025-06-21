import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../services/http';
import { IIngredient } from '../../../models/masterData/ingredient';

export const ingredientApi = createApi({
    reducerPath: 'ingredient/ingredient',
    tagTypes: ['Ingredient'],
    baseQuery: axiosBaseQuery(),

    endpoints: (builder) => ({
        getIngredients: builder.query<Array<IIngredient>, void>({
            query: () => ({
                url: 'api/v1/MasterData/Ingredient/GetList',
                method: 'GET',
            }),
            providesTags: (result) => !result ? [{ type: 'Ingredient', id: 'LIST' }] : [
                ...result.map(({ id }) => ({ type: 'Ingredient' as const, id })),
                { type: 'Ingredient', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetIngredientsQuery,
    useLazyGetIngredientsQuery,
} = ingredientApi;

