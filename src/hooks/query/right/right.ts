import { createApi } from '@reduxjs/toolkit/query/react';
import { IRight } from '../../../models/rights/right';
import { axiosBaseQuery } from '../../../services/http';

export const rightApi = createApi({
    reducerPath: 'right/right',
    tagTypes: ['Right'],
    baseQuery: axiosBaseQuery(),

    endpoints: (builder) => ({
        getRights: builder.query<Array<IRight>, void>({
            query: () => ({
                url: 'api/v1/Right/GetList',
                method: 'GET',
            }),
            providesTags: (result) => !result ? [{ type: 'Right', id: 'LIST' }] : [
                ...result.map(({ id }) => ({ type: 'Right' as const, id })),
                { type: 'Right', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetRightsQuery,
    useLazyGetRightsQuery,
} = rightApi;

