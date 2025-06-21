import { Dialog, IconButton, Toolbar, styled } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { CustomMouseEvent } from '../../../models/helper';
import themeVariables from '../../../theme/themeVariables';
import Loading from '../../root/Loading';

export interface ICustomDialogProps {
    open : boolean;
    onClose : (e ?: CustomMouseEvent) => void;
    isLoading ?: boolean;
    title ?: string | React.ReactNode;
    fullScreen ?: boolean;
    fullWidth ?: boolean;
    maxWidth ?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    children ?: React.ReactNode;
}

const StyledDialog = styled(Dialog)(() => ({
    '& .MuiDialog-paper': {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        overflow: 'hidden',
        backgroundColor: themeVariables.colors.material.background.default,
    },
}));

const ContentContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '10px',
    overflow: 'hidden',
    backgroundColor: themeVariables.colors.material.background.default,
});

const CustomDialog = (props : ICustomDialogProps) : React.ReactElement => {

    const handleClose = (event : unknown) : void => {
        props.onClose(event as CustomMouseEvent);
    };

    return (
        <StyledDialog
            open={props.open}
            fullScreen={props.fullScreen}
            fullWidth={props.fullWidth}
            maxWidth={props.maxWidth}
            onClose={handleClose}
        >
            <Toolbar variant={'dialog'}>
                <div className={'fdr flx1 aic'}>
                    <span className={'flx1'}>
                        { props.title }
                    </span>
                    <IconButton onClick={props.onClose}>
                        <CloseIcon className={'cw'}/>
                    </IconButton>
                </div>
            </Toolbar>
            {
                props.isLoading && <Loading />
            }
            <ContentContainer>
                { props.children }
            </ContentContainer>
        </StyledDialog>
    );
};

export default CustomDialog;