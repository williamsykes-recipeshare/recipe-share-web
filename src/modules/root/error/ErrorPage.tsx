import '../../../style/root/errorPage.scss';
import React, { useCallback } from 'react';
import Page from '../../custom/paper/Page';
import { Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IErrorInformation } from '../../../models/errorInformation';

interface IErrorPageProps {
    errorInformation ?: IErrorInformation;
}

const ErrorPage = (props : IErrorPageProps) : JSX.Element => {
    const {
        errorInformation,
    } = props;

    const onBackClick = useCallback(() => {
        // TODO: this doesn't do anything most of the time, rather just navigate explicitly back to home
        window.history.back();
        window.location.reload();
    }, []);

    const onCopyClick = useCallback(() => {
        if (!errorInformation) return;
        navigator.clipboard.writeText(JSON.stringify(errorInformation));
    }, [errorInformation]);

    return (
        <Page className='fdc hfill error-page'>
            <div className='fdc flx1 aic jcc'>
                <picture>
                    <source media='(min-width: 760px)' srcSet='/assets/images/error@2x.png' />
                    <source media='(max-width: 760px)' srcSet='/assets/images/error.png' />
                    <img alt='IfItDoesntMatchAnyMedia' />
                </picture>
                <div className='mt20'>
                    <Typography variant='bold' fontSize={35} color={'white'}>
                        {errorInformation?.message ?? 'An error has occurred.'}
                    </Typography>
                </div>
                <div className='fdr aic jcc mt20'>
                    <Button color='inherit' variant='outlined' onClick={onCopyClick}>
                        <FontAwesomeIcon icon={['fas', 'link']} className='mr9' />
                        COPY ERROR CODE
                    </Button>
                </div>
                <div className='fdr aic jcc mt20'>
                    <div className='mr15'>
                        <Button onClick={onBackClick} color='inherit' variant='outlined'>GO BACK HOME</Button>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default ErrorPage;