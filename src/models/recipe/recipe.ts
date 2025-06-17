import { AnyObject, ObjectSchema } from 'yup';
import { Yup, YupSchema } from '../../services/helper/yup';
import { IBase } from '../base';
import { v4 } from 'uuid';
import { IRecipeIngredient } from './recipeIngredient';
import { IRecipeDietaryTag } from './recipeDietaryTag';
import { IStep } from '../masterData/step';

export interface IRecipe extends IBase {
    guid : string;
    name : string;
    cookingTimeMinutes : number;

    recipeIngredients : Array<IRecipeIngredient> | null;
    recipeDietaryTags : Array<IRecipeDietaryTag> | null;
    steps : Array<IStep> | null;
}

export interface IRecipeFormValue {
    id : number;
    guid : string;
    name : string;
    cookingTimeMinutes : number;

    isActive : boolean;
}

type YupRecipeShape = Record<keyof IRecipeFormValue, YupSchema>;

export default class RecipeHelper {
    public static initRecipeFormValues(recipe ?: IRecipe | null) : IRecipeFormValue {
        return {
            id: recipe?.id ?? 0,
            guid: recipe?.guid ?? v4(),
            name: recipe?.name ?? '',
            cookingTimeMinutes: recipe?.cookingTimeMinutes ?? 0,

            isActive: recipe?.isActive ?? true,
        };
    }

    public static formRecipeSchema = () : ObjectSchema<AnyObject, YupRecipeShape> => Yup
        .object<YupRecipeShape, YupRecipeShape>({
            id: Yup.number().required('Required'),
            guid: Yup.string().required('Required'),
            name: Yup.string().required('Required'),
            cookingTimeMinutes: Yup.number().required('Required'),

            // TODO: add array types here

            isActive: Yup.boolean().required('Required'),
        });
}