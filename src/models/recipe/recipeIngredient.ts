import { IBase } from '../base';
import { IIngredient } from '../masterData/ingredient';

export interface IRecipeIngredient extends IBase {
    ingredientId : number;
    ingredient ?: IIngredient;
    recipeId : number;

    quantity : string;
}