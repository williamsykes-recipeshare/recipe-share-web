import { Close, Fullscreen } from '@mui/icons-material';
import { Box, Dialog, DialogContent, IconButton, styled, TextField, TextFieldProps, TextFieldVariants, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';


type FormFullscreenTextFieldVarients = {
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant ?: TextFieldVariants;
} & Omit<TextFieldProps, 'variant'>;

const StyledBox = styled(Box)({
    position: 'relative',
});

const StyledTextField = styled(TextField)({
    minHeight: '60vh',
    height: '60vh',
    maxHeight: '60vh',
    ' textarea': {
        overflow: 'scroll !important',
    },
});

interface IMultiLineTextFieldFullscreenProps {
    InputTextFieldProps ?: FormFullscreenTextFieldVarients;
}

const MultiLineTextFieldFullscreen = (props : IMultiLineTextFieldFullscreenProps) : React.JSX.Element => {
    const {
        InputTextFieldProps,
    } = props;
    const [open, setOpen] = useState<boolean>(false);

    const onClick = () : void => {
        setOpen(true);
    };

    const onClose = () : void => {
        setOpen(false);
    };

    return (
        <StyledBox>
            <div className='posa right0 bottom25'>
                <Tooltip title='Full Screen'>
                    <IconButton color='primary' onClick={onClick}>
                        <Fullscreen />
                    </IconButton>
                </Tooltip>
            </div>
            <Dialog
                open={open}
                maxWidth='md'
                fullWidth
            >
                <Toolbar>
                    {
                        InputTextFieldProps?.label &&
                        <Typography variant='bold' fontSize={14} color={'primary'}>
                            {InputTextFieldProps.label}
                        </Typography>
                    }
                    <span className='flx1' />
                    <Tooltip title='Close'>
                        <IconButton onClick={onClose} color='primary'>
                            <Close />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <DialogContent>
                    <StyledTextField
                        {...InputTextFieldProps}
                        className={`${InputTextFieldProps?.className}`}
                    />
                </DialogContent>
            </Dialog>
        </StyledBox>
    );
};

export default MultiLineTextFieldFullscreen;