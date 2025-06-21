import {
    Autocomplete,
    AutocompleteRenderInputParams,
    CircularProgress,
    IconButton,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo } from 'react';
import lodash from 'lodash';
import { useGetDietaryTagsQuery } from '../../../hooks/query/masterData/dietaryTag';
import { IDietaryTag } from '../../../models/masterData/dietaryTag';
import { CustomMouseEvent, MuiAutocompleteValueType } from '../../../models/helper';
import CloseIcon from '@mui/icons-material/Close';
import CustomChip from '../chip/CustomChip';

export interface IDietaryTagAutocompleteProps {
    id ?: string;
    value : Array<number> | null;
    onChange ?: (value : Array<IDietaryTag>, event : React.ChangeEvent<MuiAutocompleteValueType>) => void;
    onBlur ?: (event : React.FocusEvent<HTMLDivElement>) => void;
    size ?: 'small' | 'medium';

    label ?: string;
    className ?: string;
    error ?: boolean;

    disabled ?: boolean;

    variant ?: 'outlined' | 'standard' | 'filled';

    fullWidth ?: boolean;
    autoFocus ?: boolean;
}

const DietaryTagAutocomplete = (props : IDietaryTagAutocompleteProps) : React.ReactElement => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const { data: dietaryTags, isFetching: isLoading } = useGetDietaryTagsQuery();

    useEffect(() => {
        if (!props.autoFocus || props.disabled || isLoading) return;

        inputRef.current?.focus();
    }, [props.disabled, isLoading, props.autoFocus]);

    const selected = useMemo(() => {
        if (!dietaryTags) return [];

        return dietaryTags.filter(x => props.value?.includes(x.id));
    }, [props.value, dietaryTags]);

    const onChange = (event : React.ChangeEvent<MuiAutocompleteValueType>, selectedValues : Array<IDietaryTag>) : void => {
        if (props.onChange) {
            props.onChange(selectedValues, event);
        }
    };

    const getOptionLabel = useCallback((option : IDietaryTag) => option.name, []);

    const getOptionSelected = useCallback((option : IDietaryTag, commodity : IDietaryTag) => option.id === commodity.id, []);

    const renderInput = useCallback((params : AutocompleteRenderInputParams) => {
        return (
            <TextField
                inputRef={inputRef}
                {...params}
                label={props.label}
                fullWidth={props.fullWidth}
                variant={props.variant}
                error={props.error}
                InputProps={{
                    ...params.InputProps,
                    endAdornment:
                        isLoading ? <CircularProgress size={22}/> : params.InputProps.endAdornment,
                }}
            />
        );
    }, [props.label, props.variant, props.error, props.fullWidth, isLoading, inputRef]);

    const options = useMemo<Array<IDietaryTag>>(() => {
        return lodash.chain(dietaryTags)
            .filter(x => !!x.isActive)
            .filter(x => !props.value?.includes(x.id))
            .orderBy(x => x.name)
            .value();
    }, [dietaryTags, props.value]);

    const handleRemove = (e : CustomMouseEvent) : void => {
        const userId = Number(e.currentTarget.value);
        const values = selected.filter(x => x.id != userId);
        if (props.onChange) {
            props.onChange(values, e);
        }
    };

    return (
        <Autocomplete
            autoHighlight
            disabled={isLoading || props.disabled}
            id={props.id}
            options={options}
            multiple={true}
            value={selected}
            className={props.className}
            openOnFocus
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={getOptionSelected}
            fullWidth={props.fullWidth}
            renderInput={renderInput}
            onChange={onChange}
            onBlur={props.onBlur}
            size={props.size}
            disableCloseOnSelect
            renderTags={(values : Array<IDietaryTag> | undefined, getTagProps) : React.ReactNode => {
                return (
                    <Tooltip
                        placement={'top-start'}
                        title={
                            <div className={'mnw250'}>
                                <Typography className={'fdc fwb fs14'} style={{ whiteSpace: 'pre-line' }}>
                                    <span>{'Selected Dietary Tags: \n\n'}</span>
                                    {
                                        values?.map((option : IDietaryTag, index : number) => {
                                            return (
                                                <div
                                                    key={`${option.name}-${index}-tooltip`}
                                                    className={'flx1 aic p5'}
                                                >
                                                    <span
                                                        className={'flx1 mr10'}
                                                    >
                                                        { option.name }
                                                    </span>
                                                    <IconButton
                                                        value={option.id}
                                                        onClick={handleRemove}
                                                        size={'small'}
                                                    >
                                                        <CloseIcon className={'fs12 cw'}/>
                                                    </IconButton>
                                                </div>
                                            );
                                        })
                                    }
                                </Typography>
                            </div>
                        }
                    >
                        <div className={'fdr fww mxw500 oya ml5 aic'}>
                            {
                                values?.map((option : IDietaryTag, index : number) => (
                                    <div key={`${option.name}-${index}-chip`}>
                                        <CustomChip
                                            label={option.name}
                                            {...getTagProps({ index })}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </Tooltip>
                );
            }}
        />
    );
};

export default DietaryTagAutocomplete;
