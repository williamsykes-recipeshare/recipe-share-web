import React, { useEffect, useState } from 'react';
import RecipeHelper, { IRecipe, IRecipeFormValue } from '../../../models/recipe/recipe';
import FormikForm from '../../custom/FormikForm';
import FormTextField from '../../custom/textField/FormTextField';
import { IRecipeIngredient } from '../../../models/recipe/recipeIngredient';
import { IRecipeDietaryTag } from '../../../models/recipe/recipeDietaryTag';
import { useSaveRecipeMutation } from '../../../hooks/query/recipe/recipe';
import useDisplaySuccessCallback from '../../../hooks/snackbar/useSuccessCallback';
import FormDietaryTagAutocomplete from '../../custom/autocomplete/form/FormDietaryTagAutocomplete';
import FormRecipeIngredients from '../../ingredient/FormEditRecipeIngredient';
import { Button, CircularProgress } from '@mui/material';
import { Save } from '@mui/icons-material';
import FormRecipeSteps from '../../step/FormRecipeStepEdit';
import { v4 } from 'uuid';
import { IStep } from '../../../models/masterData/step';

interface IRecipeFormProps {
    initialValue : IRecipe | null;
    isLoading ?: boolean;

    onCancelClick ?: (event : React.MouseEvent<HTMLButtonElement>) => void;
    onClose ?: () => void;
}

const RecipeForm = (props : IRecipeFormProps) : React.ReactElement => {

    const onSuccess = useDisplaySuccessCallback('Success');
    const [updateRecipe, { isLoading: isSaving }] = useSaveRecipeMutation();

    const [initialValues, setInitialValues] = useState<IRecipeFormValue>(RecipeHelper.initRecipeFormValues(props.initialValue));

    useEffect(() => {
        setInitialValues(RecipeHelper.initRecipeFormValues(props.initialValue));
    }, [props.initialValue]);

    const onSubmit = async (values : IRecipeFormValue) : Promise<void> => {
        await updateRecipe({
            ...values,
            recipeIngredients: values.recipeIngredientFormValues.map((recipeIngredient) => ({
                ingredientId: recipeIngredient.ingredientId,
                quantity: recipeIngredient.quantity,
                id: props.initialValue?.recipeIngredients?.find(x => x.ingredientId === recipeIngredient.ingredientId)?.id ?? 0,
            } as IRecipeIngredient)),
            recipeDietaryTags: values.dietaryTagIds.map((dietaryTagId) => ({
                dietaryTagId: dietaryTagId,
                id: props.initialValue?.recipeDietaryTags?.find(x => x.dietaryTagId === dietaryTagId)?.id ?? 0,
            } as IRecipeDietaryTag)),
            steps: values.steps.map((step, index) => {
                const existingStep = props.initialValue?.steps?.find(s => s.name === step.name) ?? null;

                return {
                    id: existingStep?.id ?? 0,
                    guid: existingStep?.guid ?? v4(),
                    recipeId: props.initialValue?.id ?? 0,
                    index: index, // This is important as it is what allows the steps to be re-ordered
                    name: step.name,
                    isActive: true,
                } as IStep;
            }),
        }).unwrap();

        setInitialValues(RecipeHelper.initRecipeFormValues(props.initialValue));

        onSuccess('Success');

        if (props.onClose) props.onClose();
    };

    return (
        <FormikForm
            initialValues={initialValues}
            validationSchema={RecipeHelper.formRecipeSchema}
            enableReinitialize
            onSubmit={onSubmit}
            className='fdc flx1 oyh pt5'
        >
            {(formProps) => (
                <>
                    {
                        isSaving ?
                            <CircularProgress color={'secondary'} /> :
                            <div className={'fdr flx1 mb20 oh'}>
                                <div className={'fdc flx2 mt40 oya'}>
                                    <div className={'fdc'}>
                                        <div className={'flx1 mh10 mt20'}>
                                            <FormTextField
                                                id={'name'}
                                                name={'name'}
                                                label={'Name'}
                                                fullWidth
                                                variant={'outlined'}
                                                size={'small'}
                                            />
                                        </div>
                                        <div className={'flx1 mh10'}>
                                            <FormTextField
                                                id={'cookingTimeMinutes'}
                                                name={'cookingTimeMinutes'}
                                                label={'Cooking Time (Minutes)'}
                                                type={'number'}
                                                fullWidth
                                                variant={'outlined'}
                                                size={'small'}
                                            />
                                        </div>
                                        <div className={'flx1 mh10'}>
                                            <FormDietaryTagAutocomplete
                                                id={'recipeDietaryTags'}
                                                name={'dietaryTagIds'}
                                                label={'Dietary Tag'}
                                                fullWidth
                                                size={'small'}
                                            />
                                        </div>
                                        <div className={'flx1 mh10'}>
                                            <FormRecipeIngredients />
                                        </div>
                                        <div className={'flx1 mh10'}>
                                            <FormRecipeSteps />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                    <Button
                        type='submit'
                        variant='outlined'
                        color='secondary'
                        disabled={!(formProps.isValid && formProps.isDirty) || props.isLoading || isSaving}>
                        <Save className='mtn2' /> SAVE
                    </Button>
                </>
            )}
        </FormikForm>
    );
};

export default RecipeForm;
