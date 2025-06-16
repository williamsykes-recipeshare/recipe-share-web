import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/react';
import axios from 'axios';

export const axiosBaseQuery = () : BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError | null, object, FetchBaseQueryMeta> =>
    async (args) => {
        try {
            const result = await axios({
                url: args.url,
                method: args.method,
                params: args.params,
                data: args.body,
            });
            return { data: result.data };
        } catch (axiosError) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const error : any | null = axiosError;
            return {
                error: {
                    error: error.error,
                    data: error.data,
                    originalStatus: error.status,
                    status: error.status,
                },
            };
        }
    };
