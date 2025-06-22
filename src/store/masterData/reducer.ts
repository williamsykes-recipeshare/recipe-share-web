import { dietaryTagApi } from '../../hooks/query/masterData/dietaryTag';
import { ingredientApi } from '../../hooks/query/masterData/ingredient';

export const masterDataReducer = {
    [dietaryTagApi.reducerPath]: dietaryTagApi.reducer,
    [ingredientApi.reducerPath]: ingredientApi.reducer,
};
