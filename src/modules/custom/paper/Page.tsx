import { Paper, PaperProps } from '@mui/material';
import React from 'react';

const Page = (props : PaperProps) : JSX.Element => {
    return (
        <Paper
            elevation={0}
            square
            variant='page'
            color='default'
            {...props}
        />
    );
};

export default Page;