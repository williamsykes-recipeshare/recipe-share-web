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
        saveRecipe: builder.mutation<IRecipe | null, Pick<IRecipe, 'id'> & Partial<IRecipe>>({
            query: (save) => ({
                url: 'api/v1/Recipe/Save',
                method: 'POST',
                body: {
                    ...save,
                    recipeIngredients: save.recipeIngredients?.map((recipeIngredient) => ({
                        ...recipeIngredient,
                        createdById: save.createdById ?? 0,
                        createdByName: save.createdByName ?? '',
                        updatedById: save.updatedById ?? 0,
                        updatedByName: save.updatedByName ?? '',
                    })),
                    recipeDietaryTags: save.recipeDietaryTags?.map((recipeDietaryTag) => ({
                        ...recipeDietaryTag,
                        createdById: save.createdById ?? 0,
                        createdByName: save.createdByName ?? '',
                        updatedById: save.updatedById ?? 0,
                        updatedByName: save.updatedByName ?? '',
                    })),
                    steps: save.steps?.map((step) => ({
                        ...step,
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
                { type: 'Recipe', id: !id ? 'LIST' : id },
            ],
        }),
        deleteRecipe: builder.mutation<IRecipe | null, Pick<IRecipe, 'id'> & Partial<IRecipe>>({
            query: (save) => ({
                url: 'api/v1/Recipe/Save',
                method: 'POST',
                body: {
                    ...save,
                    isActive: false,
                },
            }),
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        recipeApi.util.updateQueryData('getRecipes', undefined, (draft) => {
                            return draft.filter((recipe) => recipe.id !== id);
                        }),
                    );
                } catch {
                // do nothing if the delete failed
                }
            },
            // No invalidatesTags here since you handle it manually:
            // invalidatesTags: ...
        }),
    }),
});

export const {
    useGetRecipesQuery,
    useLazyGetRecipesQuery,
    useSaveRecipeMutation,
    useDeleteRecipeMutation,
} = recipeApi;

