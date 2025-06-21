import React from 'react';
import { FormControl, FormControlProps, FormHelperText, TextField, TextFieldProps, TextFieldVariants } from '@mui/material';
import { useController } from 'react-hook-form';
import MultiLineTextFieldFullscreen from './MultiLineTextFieldFullscreen';

type FormTextFieldVarients = {
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant ?: TextFieldVariants;
  } & Omit<TextFieldProps, 'variant'>;

interface IFormTextFieldProps extends Omit<FormTextFieldVarients, 'name' | 'value' | 'error'> {
    name : string;

    formControlProps ?: Partial<Omit<FormControlProps, 'error' | 'disabled' | 'fullWidth'>>;
}

const FormTextField = (props : IFormTextFieldProps) : JSX.Element => {
    const {
        formControlProps,
        ...rest
    } = props;

    const {field, fieldState} = useController({
        name: props.name,
        disabled: props.disabled,
    });

    const onChange = (event : React.ChangeEvent<HTMLTextAreaElement>) : void => {
        field.onChange(event);
        if (props.onChange) props.onChange(event);
    };

    const onBlur = (event : React.FocusEvent<HTMLTextAreaElement>) : void => {
        field.onBlur();
        if (props.onBlur) props.onBlur(event);
    };

    return (
        <FormControl
            error={!!fieldState.error}
            disabled={props.disabled}
            fullWidth={props.fullWidth}
            {...formControlProps}
        >
            <TextField
                autoComplete='off'
                {...rest}
                value={field.value ?? ''}
                error={!!fieldState.error}
                onChange={onChange}
                onBlur={onBlur}
            />
            <FormHelperText error>{fieldState.error?.message || ''}</FormHelperText>
            {
                props.multiline &&
                <MultiLineTextFieldFullscreen
                    InputTextFieldProps={{
                        autoComplete: 'off',
                        ...rest,
                        value: field.value ?? '',
                        error: !!fieldState.error,
                        onChange,
                        onBlur,
                    }}
                />
            }
        </FormControl>
    );
};

export default FormTextField;
