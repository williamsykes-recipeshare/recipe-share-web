import { Dialog, IconButton, Toolbar, Tooltip } from '@mui/material';
import React, { useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import ConfirmButton from '../button/ConfirmButton';
import { CustomMouseEvent } from '../../../models/helper';
import CancelButton from '../button/CancelButton';
import CloseIcon from '@mui/icons-material/Close';

export interface IConfirmDialogProps {
    children ?: React.ReactNode | string;
    value : number | string;
    tooltip : string;
    buttonClassName ?: string;
    size ?: 'small' | 'medium' | 'large';
    disabled ?: boolean;
    title : string;
    dialogDescription ?: string;
    buttonType ?: 'pill' | 'menuItem' | 'icon' | 'toggle';
    onConfirm ?: (value : number | string) => void;
    confirmButtonLabel ?: string;
    cancelButtonLabel ?: string;
}

const ConfirmDialog = (props : IConfirmDialogProps) : React.ReactElement => {
    const [open, setOpen] = useState<boolean>(false);

    const onOpenButtonClick = (e : CustomMouseEvent) : void => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
    };

    const onCancelClick = (e : CustomMouseEvent) : void => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
    };

    const onConfirmClick = (e : CustomMouseEvent) : void => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        if (props.onConfirm) {
            props.onConfirm(props.value);
        }
    };

    // The button showed initially that triggers the confirmation dialog to open.
    const openButton = useMemo<React.ReactElement>(() => {
        switch (props.buttonType) {
            case 'icon':
                return (
                    <Tooltip title={props.tooltip}>
                        <div className={'wfc'}>
                            <IconButton
                                onClick={onOpenButtonClick}
                                disabled={props.disabled}
                                className={props.buttonClassName}
                                size={props.size ?? 'small'}
                            >
                                { props.children }
                            </IconButton>
                        </div>
                    </Tooltip>
                );
            case 'pill':
            default:
                return (
                    <Tooltip title={props.tooltip}>
                        <div className={'wfc'}>
                            <ConfirmButton
                                onClick={onOpenButtonClick}
                                className={props.buttonClassName}
                                disabled={props.disabled}
                            >
                                { props.children }
                            </ConfirmButton>
                        </div>
                    </Tooltip>
                );
        }
    }, [
        props.buttonType,
        props.buttonClassName,
        props.disabled,
        props.tooltip,
        props.size,
        props.children,
    ]);

    const handleClose = () : void => {
        setOpen(false);
    };

    return (
        <>
            { openButton }
            <Dialog
                open={open}
                fullWidth
                maxWidth={'md'}
            >
                <Toolbar variant={'dialog'}>
                    <div className={'fdr flx1 aic'}>
                        <Typography className={'flx1 fwb cw fs18'}>
                            { props.title }
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon className={'cw'}/>
                        </IconButton>
                    </div>
                </Toolbar>
                <div className={'fdc p10 bcm'}>
                    <Typography className={'fdr mh10 mv10 cw'} style={{whiteSpace: 'pre-line'}}>
                        { props.dialogDescription }
                    </Typography>
                    <div className={'fdr aic jcfe mb10 mh10'}>
                        <ConfirmButton onClick={onConfirmClick} className={'mr15'}>
                            { props.confirmButtonLabel ?? 'OK' }
                        </ConfirmButton>
                        <CancelButton onClick={onCancelClick}>
                            { props.cancelButtonLabel ?? 'CANCEL' }
                        </CancelButton>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default ConfirmDialog;
