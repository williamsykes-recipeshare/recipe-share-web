import { createApi } from '@reduxjs/toolkit/query/react';
import { IRight } from '../../../models/rights/right';
import { axiosBaseQuery } from '../../../services/http';

export const rightRightApi = createApi({
    reducerPath: 'right/right',
    tagTypes: ['RightRight'],
    baseQuery: axiosBaseQuery(),

    endpoints: (builder) => ({
        getRightRights: builder.query<Array<IRight>, void>({
            query: () => ({
                url: 'api/v1/Right/GetList',
                method: 'GET',
            }),
            providesTags: (result) => !result ? [{ type: 'RightRight', id: 'LIST' }] : [
                ...result.map(({ id }) => ({ type: 'RightRight' as const, id })),
                { type: 'RightRight', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetRightRightsQuery,
    useLazyGetRightRightsQuery,
} = rightRightApi;

