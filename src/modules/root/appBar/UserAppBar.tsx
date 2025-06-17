import { AppBar, Avatar, Button, styled, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../../hooks/redux/useAppDispatch';
import AuthThunk from '../../../store/auth/thunk';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux/useAppSelector';
import { max650Width } from '../../../constants/screenContants';

const StyledToolbar = styled(Toolbar)({

    justifyContent: 'space-between',

    [max650Width]: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',

        rowGap: '10px',
        columnGap: '20px',

        justifyContent: 'center',
    },
});

const UserAppBar = () : JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(x => x.auth.session?.user);

    const onLogoutClick = () : void => {
        dispatch(AuthThunk.logout());
        navigate('/', {
            replace: true,
        });
    };

    const onLogoClick = () : void => {
        navigate('/');
    };

    return (
        <AppBar variant={'transparent'} position='static'>
            <StyledToolbar>
                <div className='fdr aic jcc'>
                    <picture>
                        {/* TODO: change to 2x version and make smaller logo */}
                        <source media='(min-width: 760px)' srcSet='/assets/images/logo.png' />
                        <source media='(max-width: 760px)' srcSet='/assets/images/logo.png' />
                        <img style={{ width: 60 }} alt='IfItDoesntMatchAnyMedia' onClick={onLogoClick} className='cursp' />
                    </picture>
                    <Typography fontSize={22} variant={'bold'} color={'black'}>
                        RecipeShare
                    </Typography>
                </div>
                <div className='fdr aic jcc'>
                    <Button
                        color='primary'
                        variant='outlined'
                        type='button'
                        onClick={onLogoutClick}
                    >
                        Logout
                    </Button>
                    <Avatar color={'primary'} className={'w60 h60 ml10'}>
                        <Typography fontSize={22} variant={'medium'} color={'white-offset'}>
                            { user?.name[0].toLocaleUpperCase() }
                        </Typography>
                    </Avatar>
                </div>
            </StyledToolbar>
        </AppBar>
    );
};

export default UserAppBar;