import { InputAdornment, OutlinedInput, OutlinedInputProps, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { CustomMouseEvent } from '../../../models/helper';
import SearchSVG from '../svg/SearchSVG';

interface ISearchInputProps extends Omit<OutlinedInputProps,
    'type' | 'margin' | 'endAdornment' | 'value' | 'onChange'> {
    autoFocus ?: boolean;
    fullWidth ?: boolean;
    onCommit ?: (value : string) => void;
    onChange ?: (value : string) => void;
    value : string;
}

const StyledOutlinedInput = styled(OutlinedInput)(() => ({
    height: 40,
    borderRadius: 50,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s',

    '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px',
        borderColor: 'white',
        borderRadius: 50,
    },

    '& .MuiOutlinedInput-input': {
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
        '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: 'white',
            opacity: 1,
            fontSize: 14,
            fontWeight: 500,
        },
    },

    '& .MuiInputAdornment-root .MuiIconButton-root': {
        color: 'white',
        transition: 'color 0.3s',
    },

    '&.Mui-focused': {
        backgroundColor: 'white',

        '& .MuiOutlinedInput-input': {
            color: 'black',
        },

        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
        },

        '& .MuiInputAdornment-root .MuiIconButton-root': {
            color: 'black',
        },
    },
}));

const SearchInput = (props : ISearchInputProps) => {
    const [value, setValue] = useState<string>(props.value);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const inputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        setValue(props.value);
    }, []);

    useEffect(() => {
        if (!props.value)
            setValue('');
    }, [props.value]);

    useEffect(() => {
        if (!props.autoFocus || props.disabled) return;

        inputRef.current?.focus();
        inputRef.current?.select();
    }, [props.disabled, props.autoFocus]);

    const handleCommit = (e : React.FormEvent<HTMLFormElement>) : void => {
        e.stopPropagation();
        e.preventDefault();

        if (props.onCommit)
            props.onCommit(value);
    };

    const handleChange = (e : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) : void => {
        const text = e.target.value;

        if (props.onChange)
            props.onChange(text);

        setValue(text);

        if (!text && props.onCommit) {
            props.onCommit('');
        }
    };

    const handleClear = (e : CustomMouseEvent) : void => {
        e.preventDefault();
        e.stopPropagation();

        if (props.onChange) props.onChange('');
        if (props.onCommit) props.onCommit('');

        setValue('');
        inputRef.current?.focus();
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <form onSubmit={handleCommit} className={`flex${props.fullWidth ? ' wfill' : ''}`}>
            <StyledOutlinedInput
                {...props}
                value={value}
                placeholder={props.placeholder ?? 'SEARCH HERE'}
                margin={'none'}
                size={props.size}
                fullWidth={props.fullWidth}
                inputRef={inputRef}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                endAdornment={
                    props.value && props.value === value
                        ? (
                            <InputAdornment className={'h-full'} position={'end'}>
                                <IconButton size={'small'} onClick={handleClear} className={'h-8 w-8'}>
                                    <ClearIcon height={20} width={20} fontSize={'medium'} className={isFocused ? 'text-black' : 'text-white'}/>
                                </IconButton>
                            </InputAdornment>
                        ) : (
                            <InputAdornment className={'h-full'} position={'end'}>
                                <IconButton size={'small'} className={'h-8 w-8'}>
                                    <SearchSVG fill={isFocused ? 'black' : 'white'} height={20} width={20} color={isFocused ? 'black' : 'white'}/>
                                </IconButton>
                            </InputAdornment>
                        )
                }
            />
        </form>
    );
};

export default SearchInput;