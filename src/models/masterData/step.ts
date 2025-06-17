import { IBase } from '../base';
import { IRecipe } from '../recipe/recipe';

export interface IStep extends IBase {
    guid : string;
    recipeId : number;
    recipe ?: IRecipe;
    index : number;
    name : string;
}