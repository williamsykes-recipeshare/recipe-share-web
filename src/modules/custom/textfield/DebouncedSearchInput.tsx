import SearchInput from './SearchInput';
import { debounce } from '@mui/material';
import React from 'react';

interface IDebouncedSearchInputProps {
    searchText : string | null;
    placeholder ?: string;
    setSearchText ?: (search : string | null) => void;
    autoFocus ?: boolean;
    disabled ?: boolean;
    fullWidth ?: boolean;
}

export const SEARCH_TEXT_DEBOUNCE_TIME = 500;

const DebouncedSearchInput = (props : IDebouncedSearchInputProps) : React.ReactElement => {
    /*
     * Debounce the updating of the search text by SEARCH_TEXT_DEBOUNCE_TIME so that the state is only updated once the
     * user stops typing.
     */
    const debounceSearch = debounce(
        (text : string | null) => onSearchTextChange(text),
        SEARCH_TEXT_DEBOUNCE_TIME,
    );

    const onSearchTextChange = (text : string | null) : void => {
        if (!props.setSearchText) return;

        props.setSearchText(text);
    };

    return (
        <SearchInput
            {...props}
            placeholder={props.placeholder}
            disabled={props.disabled}
            id={'searchText'}
            value={props.searchText ?? ''}
            onChange={debounceSearch}
            size={'small'}
            autoFocus={props.autoFocus}
            fullWidth={props.fullWidth}
        />
    );
};

export default DebouncedSearchInput;