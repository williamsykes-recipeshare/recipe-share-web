import { FormControl, FormHelperText } from '@mui/material';
import React from 'react';
import DietaryTagAutocomplete, { IDietaryTagAutocompleteProps } from '../DietaryTagAutocomplete';
import { useController, useFormContext, FieldValues } from 'react-hook-form';
import { IDietaryTag } from '../../../../models/masterData/dietaryTag';
import { MuiAutocompleteValueType } from '../../../../models/helper';

interface IFormDietaryTagAutocompleteProps extends Omit<IDietaryTagAutocompleteProps, 'value' | 'error'> {
    name : string;

    // onChange ?: (event : React.SyntheticEvent<Element, Event>, value : Array<IDietaryTag>, context : UseFormReturn<FieldValues, unknown, undefined>) => void;
}

const FormDietaryTagAutocomplete = (props : IFormDietaryTagAutocompleteProps) : React.ReactElement => {
    const { name, ...rest } = props;

    const { field, fieldState } = useController({
        name: name,
        disabled: props.disabled,
    });

    const context = useFormContext<FieldValues>();

    const onChange = (value : Array<IDietaryTag>, event : React.ChangeEvent<MuiAutocompleteValueType>) : void => {
        context.setValue(name, value.map(x => x.id));

        // Slight delay to help formik process its own state so that onChange does not override changes.
        setTimeout(() => {
            if (props.onChange) props.onChange(value, event);
        });
    };

    const onBlur = (event : React.FocusEvent<HTMLDivElement>) : void => {
        field.onBlur();
        if (props.onBlur) props.onBlur(event);
    };

    return (
        <div className={'mnh64 flx1'}>
            <FormControl error={!!fieldState.error} disabled={props.disabled} fullWidth={props.fullWidth}>
                <DietaryTagAutocomplete
                    {...rest}
                    value={field.value}
                    error={!!fieldState.error}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <FormHelperText error>{fieldState.error?.message || ''}</FormHelperText>
            </FormControl>
        </div>
    );
};

export default FormDietaryTagAutocomplete;
