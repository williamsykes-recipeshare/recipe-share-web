import {
    Autocomplete,
    AutocompleteRenderInputParams,
    CircularProgress,
    TextField,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import lodash from 'lodash';
import { IIngredient } from '../../../models/masterData/ingredient';
import { MuiAutocompleteValueType } from '../../../models/helper';
import { useGetIngredientsQuery } from '../../../hooks/query/masterData/ingredient';

export interface IIngredientAutocompleteProps {
    id ?: string;
    value : IIngredient | number | null; // accept either id or whole object for flexibility
    onChange ?: (ingredient : IIngredient | null) => void;
    onBlur ?: (event : React.FocusEvent<HTMLDivElement>) => void;
    size ?: 'small' | 'medium';

    label ?: string;
    className ?: string;
    error ?: boolean;

    excludeIds ?: Array<number>;

    disabled ?: boolean;

    variant ?: 'outlined' | 'standard' | 'filled';

    fullWidth ?: boolean;
    autoFocus ?: boolean;
  }

const IngredientAutocomplete = (props : IIngredientAutocompleteProps) : React.ReactElement => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { data: ingredients, isFetching: isLoading } = useGetIngredientsQuery();

    useEffect(() => {
        if (!props.autoFocus || props.disabled || isLoading) return;

        inputRef.current?.focus();
    }, [props.autoFocus, props.disabled, isLoading]);

    const selected = useMemo(() => {
        return ingredients?.find(x => x.id === props.value) ?? null;
    }, [props.value, ingredients]);

    const onChange = (event : React.ChangeEvent<MuiAutocompleteValueType>, newValue : IIngredient | null) : void => {
        if (props.onChange) props.onChange(newValue);
    };

    const getOptionLabel = useCallback((option : IIngredient) => option.name, []);
    const isOptionEqualToValue = useCallback((option : IIngredient, value : IIngredient) => option.id === value.id, []);

    const renderInput = useCallback(
        (params : AutocompleteRenderInputParams) => (
            <TextField
                inputRef={inputRef}
                {...params}
                label={props.label}
                fullWidth={props.fullWidth}
                variant={props.variant}
                error={props.error}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: isLoading ? <CircularProgress size={22} /> : params.InputProps.endAdornment,
                }}
            />
        ),
        [props.label, props.variant, props.error, props.fullWidth, isLoading],
    );

    const options = useMemo<Array<IIngredient>>(() => {
        return lodash
            .chain(ingredients)
            .filter(x => !!x.isActive)
            .filter(x => !props.excludeIds?.includes(x.id))
            .orderBy(x => x.name)
            .value();
    }, [ingredients, props.excludeIds]);


    return (
        <Autocomplete
            disabled={isLoading || props.disabled}
            id={props.id}
            options={options}
            value={selected}
            className={props.className}
            openOnFocus
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            fullWidth={props.fullWidth}
            renderInput={renderInput}
            onChange={onChange}
            onBlur={props.onBlur}
            size={props.size}
        />
    );
};

export default IngredientAutocomplete;
