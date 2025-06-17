import { IBase } from '../base';
import { IDietaryTag } from '../masterData/dietaryTag';

export interface IRecipeDietaryTag extends IBase {
    dietaryTagId : number;
    dietaryTag ?: IDietaryTag;
    recipeId : number;
}