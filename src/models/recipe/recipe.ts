import { AnyObject, ObjectSchema } from 'yup';
import { Yup, YupSchema } from '../../services/helper/yup';
import { IBase } from '../base';
import { v4 } from 'uuid';
import { IRecipeIngredient } from './recipeIngredient';
import { IRecipeDietaryTag } from './recipeDietaryTag';
import { IStep } from '../masterData/step';
import lodash from 'lodash';

export interface IRecipe extends IBase {
    guid : string;
    name : string;
    cookingTimeMinutes : number;

    recipeIngredients : Array<IRecipeIngredient> | null;
    recipeDietaryTags : Array<IRecipeDietaryTag> | null;
    steps : Array<IStep> | null;
}

export interface IRecipeIngredientFormValue {
    ingredientId : number;
    quantity : number;
}

export interface IRecipeStepFormValue {
    name : string;
    index : number;
}

export interface IRecipeFormValue {
    id : number;
    guid : string;
    name : string;
    cookingTimeMinutes : number;

    recipeIngredientFormValues : Array<IRecipeIngredientFormValue>;
    dietaryTagIds : Array<number>;
    steps : Array<IRecipeStepFormValue>;

    isActive : boolean;
}

type YupRecipeIngredientShape = Record<keyof IRecipeIngredientFormValue, YupSchema>;
type YupRecipeStepShape = Record<keyof IRecipeStepFormValue, YupSchema>;
type YupRecipeShape = Record<keyof IRecipeFormValue, YupSchema>;

export default class RecipeHelper {
    public static initRecipeFormValues(recipe ?: IRecipe | null) : IRecipeFormValue {
        return {
            id: recipe?.id ?? 0,
            guid: recipe?.guid ?? v4(),
            name: recipe?.name ?? '',
            cookingTimeMinutes: recipe?.cookingTimeMinutes ?? 0,

            recipeIngredientFormValues: recipe?.recipeIngredients?.filter(x => x.isActive).map(x => {
                return { ingredientId: x.ingredientId, quantity: x.quantity };
            }) ?? [],
            dietaryTagIds: recipe?.recipeDietaryTags?.filter(x => x.isActive).map(x => x.dietaryTagId) ?? [],
            steps: lodash.orderBy(recipe?.steps ?? [], x => x.index).filter(x => x.isActive).map(x => {
                return { name: x.name, index: x.index };
            }),

            isActive: recipe?.isActive ?? true,
        };
    }

    public static formRecipeIngredientSchema = () : ObjectSchema<AnyObject, YupRecipeIngredientShape> => Yup
        .object<YupRecipeIngredientShape, YupRecipeIngredientShape>({
            ingredientId: Yup.number().required('Required'),
            quantity: Yup.number().typeError('Must be a number').required('Required').moreThan(0, 'Must be greater than 0'),
        });

    public static formRecipeStepSchema = () : ObjectSchema<AnyObject, YupRecipeStepShape> => Yup
        .object<YupRecipeStepShape, YupRecipeStepShape>({
            name: Yup.string().required('Required'),
            index: Yup.number().required('Required'),
        });

    public static formRecipeSchema = () : ObjectSchema<AnyObject, YupRecipeShape> => Yup
        .object<YupRecipeShape, YupRecipeShape>({
            id: Yup.number().required('Required'),
            guid: Yup.string().required('Required'),
            name: Yup.string().required('Required'),
            cookingTimeMinutes: Yup.number().typeError('Must be a number').required('Required').min(0, 'Must be greater than or equal to 0'),

            recipeIngredientFormValues: Yup.array().of(this.formRecipeIngredientSchema()).min(1, 'At least one ingredient is required').required('Required'),
            dietaryTagIds: Yup.array().of(Yup.number()).required('Required'),
            steps: Yup.array().of(this.formRecipeStepSchema()).min(1, 'At least one step is required').required('Required'),

            isActive: Yup.boolean().required('Required'),
        });
}