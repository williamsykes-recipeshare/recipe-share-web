import React, { useMemo } from 'react';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import { IconButton, Grid, TextField, Button, FormHelperText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IRecipeFormValue, IRecipeIngredientFormValue } from '../../models/recipe/recipe';
import IngredientAutocomplete from '../custom/autocomplete/IngredientAutocomplete';

const FormRecipeIngredients = () : JSX.Element => {
    const { control, formState: { errors } } = useFormContext<IRecipeFormValue>();

    // useFieldArray binds to the array of recipeIngredientFormValues
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'recipeIngredientFormValues',
    });

    const selectedIngredientIds = useMemo(() => {
        return fields.map(f => f.ingredientId).filter(id => !!id && id > 0);
    }, [fields]);

    return (
        <Grid container direction='column' spacing={2}>
            {fields.map((field, index) => (
                <Grid container item spacing={2} key={field.id}>
                    {/* Ingredient Selector */}
                    <Grid item xs={5}>
                        <Controller
                            control={control}
                            name={`recipeIngredientFormValues.${index}.ingredientId`}
                            render={({ field: ingredientField, fieldState }) => (
                                <IngredientAutocomplete
                                    {...ingredientField}
                                    value={ingredientField.value || null}
                                    onChange={(ingredient) => ingredientField.onChange(ingredient?.id ?? null)}
                                    error={!!fieldState.error}
                                    excludeIds={selectedIngredientIds.filter(id => id !== ingredientField.value)} // avoid excluding self
                                    fullWidth
                                />
                            )}
                        />
                        <FormHelperText error>
                            {errors.recipeIngredientFormValues?.[index]?.ingredientId?.message || ''}
                        </FormHelperText>
                    </Grid>

                    {/* Quantity Input */}
                    <Grid item xs={5}>
                        <Controller
                            control={control}
                            name={`recipeIngredientFormValues.${index}.quantity`}
                            render={({ field: quantityField, fieldState }) => (
                                <TextField
                                    {...quantityField}
                                    type='text'
                                    label='Quantity'
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message || ''}
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    {/* Remove Button */}
                    <Grid item xs={2}>
                        <IconButton onClick={() => remove(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}

            <Grid item>
                <Button
                    variant='outlined'
                    startIcon={<AddIcon />}
                    onClick={() => append({ ingredientId: 0, quantity: '' } as IRecipeIngredientFormValue)}
                >
                    Add Ingredient
                </Button>
            </Grid>
        </Grid>
    );
};

export default FormRecipeIngredients;
