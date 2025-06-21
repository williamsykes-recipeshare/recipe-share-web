import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../services/http';
import { IDietaryTag } from '../../../models/masterData/dietaryTag';

export const dietaryTagApi = createApi({
    reducerPath: 'dietaryTag/dietaryTag',
    tagTypes: ['DietaryTag'],
    baseQuery: axiosBaseQuery(),

    endpoints: (builder) => ({
        getDietaryTags: builder.query<Array<IDietaryTag>, void>({
            query: () => ({
                url: 'api/v1/MasterData/DietaryTag/GetList',
                method: 'GET',
            }),
            providesTags: (result) => !result ? [{ type: 'DietaryTag', id: 'LIST' }] : [
                ...result.map(({ id }) => ({ type: 'DietaryTag' as const, id })),
                { type: 'DietaryTag', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetDietaryTagsQuery,
    useLazyGetDietaryTagsQuery,
} = dietaryTagApi;

