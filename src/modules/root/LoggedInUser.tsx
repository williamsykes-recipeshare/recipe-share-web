import { Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../hooks/redux/useAppSelector';

const LoggedInUser = () : React.JSX.Element => {
    const user = useAppSelector(x => x.auth.session?.user);

    return (
        <div className='mr30'>
            <Typography variant='bold' fontSize={13}>
                Welcome, {user?.name}
            </Typography>
        </div>
    );
};

export default LoggedInUser;