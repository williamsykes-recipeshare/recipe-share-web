import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../../models/rights/user';
import { axiosBaseQuery } from '../../../services/http';

export const rightUserApi = createApi({
    reducerPath: 'right/user',
    tagTypes: ['RightUser', 'RightUser-Dropdown'],
    baseQuery: axiosBaseQuery(),

    endpoints: (builder) => ({
        getRightUser: builder.query<IUser, number>({
            query: (id) => ({
                url: 'api/v1/User/Get',
                method: 'GET',
                params: {
                    id,
                },
            }),
            providesTags: (result, error, id) => [{ type: 'RightUser', id }],
        }),
        getRightUsers: builder.query<Array<IUser>, void>({
            query: () => ({
                url: 'api/v1/User/GetUserList',
                method: 'GET',
            }),
            providesTags: (result) => !result ? [{ type: 'RightUser', id: 'LIST' }] : [
                ...result.map(({ id }) => ({ type: 'RightUser' as const, id })),
                { type: 'RightUser', id: 'LIST' },
            ],
        }),
        saveRightUser: builder.mutation<IUser | null, Pick<IUser, 'id'> & Partial<IUser>>({
            query: (save) => ({
                url: 'api/v1/User/Save',
                method: 'POST',
                body: {
                    ...save,
                    userPassword: !save.userPassword ? null : {
                        password: btoa(save.userPassword.password),
                    },
                    userRights: save.userRights?.map((userRight) => ({
                        ...userRight,
                        createdById: save.createdById ?? 0,
                        createdByName: save.createdByName ?? '',
                        updatedById: save.updatedById ?? 0,
                        updatedByName: save.updatedByName ?? '',
                    })),
                    createdById: save.createdById ?? 0,
                    createdByName: save.createdByName ?? '',
                    updatedById: save.updatedById ?? 0,
                    updatedByName: save.updatedByName ?? '',
                },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'RightUser', id: !id ? 'LIST' : id },
                { type: 'RightUser-Dropdown', id: !id ? 'LIST' : id },
            ],
        }),
        saveRightUserV2: builder.mutation<IUser | null, Pick<IUser, 'id'> & Partial<IUser>>({
            query: (save) => ({
                url: 'api/v2/User/Save',
                method: 'POST',
                body: {
                    ...save,
                    userRights: save.userRights?.map((userRight) => ({
                        ...userRight,
                        createdById: save.createdById ?? 0,
                        createdByName: save.createdByName ?? '',
                        updatedById: save.updatedById ?? 0,
                        updatedByName: save.updatedByName ?? '',
                    })),
                    createdById: save.createdById ?? 0,
                    createdByName: save.createdByName ?? '',
                    updatedById: save.updatedById ?? 0,
                    updatedByName: save.updatedByName ?? '',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'RightUser', id: !id ? 'LIST' : id }],
        }),
        deleteRightUser: builder.mutation<IUser | null, Pick<IUser, 'id'> & Partial<IUser>>({
            query: (save) => ({
                url: 'api/v1/User/Delete',
                method: 'DELETE',
                params: {
                    id: save.id,
                },
            }),
            invalidatesTags: (result, error, save) => [{ type: 'RightUser', id: save.id }],
        }),
    }),
});

export const {
    useGetRightUserQuery,
    useGetRightUsersQuery,
    useSaveRightUserMutation,
    useSaveRightUserV2Mutation,
    useDeleteRightUserMutation,
    useLazyGetRightUsersQuery,
    useLazyGetRightUserQuery,
} = rightUserApi;