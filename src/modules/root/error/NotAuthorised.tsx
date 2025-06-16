import React, { useCallback } from 'react';
import Page from '../../custom/paper/Page';
import { Button, Typography } from '@mui/material';

const NotAuthorised = () : React.JSX.Element => {

    const onBackClick = useCallback(() => {
        window.history.back();
        window.location.reload();
    }, []);

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
                        {'You don\'t have access to this page.'}
                    </Typography>
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

export default NotAuthorised;