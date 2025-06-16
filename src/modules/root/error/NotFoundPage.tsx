import React, { useCallback } from 'react';
import Page from '../../custom/paper/Page';
import { Button, Typography } from '@mui/material';

const NotFoundPage = () : React.JSX.Element => {

    const onBackClick = useCallback(() => {
        window.history.back();
        window.location.reload();
    }, []);

    return (
        <Page className='fdc hfill error-page'>
            <Typography>error</Typography>
            <div className='fdr aic jcc mt20'>
                <div className='mr15'>
                    <Button onClick={onBackClick} color='inherit' variant='outlined'>GO BACK HOME</Button>
                </div>
            </div>
        </Page>
    );
};

export default NotFoundPage;