import React, { useMemo } from 'react';
import { IRecipe } from '../../../models/recipe/recipe';
import RecipeForm from '../form/RecipeForm';
import CustomDialog from '../../custom/dialog/CustomDialog';

interface IRecipeEditDialogProps {
    recipe ?: IRecipe | null;
    disabled ?: boolean;
    open : boolean;
    handleClose : () => void;
}

const RecipeEditDialog = (props : IRecipeEditDialogProps) : JSX.Element => {

    const recipe = useMemo(() => {
        return props.recipe ?? null;
    }, [props.recipe]);

    return (
        <CustomDialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth
            fullScreen
            title={props.recipe ? `EDIT ${props.recipe.name}` : 'CREATE NEW RECIPE'}
        >
            <RecipeForm
                initialValue={recipe}
                onCancelClick={props.handleClose}
                onClose={props.handleClose}
            />
        </CustomDialog>
    );
};

export default RecipeEditDialog;
