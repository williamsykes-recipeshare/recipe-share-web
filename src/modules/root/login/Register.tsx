import React, { useMemo, useState } from 'react';
import UserHelper, { IUserRegistrationFormValue } from '../../../models/rights/user';
import { Box, Button, CircularProgress, IconButton, InputAdornment, styled, Typography } from '@mui/material';
import FormTextField from '../../custom/textField/FormTextField';
import { useAppSelector } from '../../../hooks/redux/useAppSelector';
import AuthThunk from '../../../store/auth/thunk';
import { useAppDispatch } from '../../../hooks/redux/useAppDispatch';
import themeVariables from '../../../theme/themeVariables';
import FormikForm from '../../custom/FormikForm';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const StyledBox = styled(Box)`
    background-color: ${themeVariables.colors.material.primary.main};
`;

const Register = () : React.JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(x => x.auth.isLoading);

    const [showPassword, setShowPassword] = useState<boolean>(true);

    const initialValues = useMemo(() => UserHelper.initUserRegistrationFormValues(), []);

    const handleClickShowPassword = () : void => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (values : IUserRegistrationFormValue) : Promise<void> => {
        dispatch(AuthThunk.register(values));
        navigate('/', {
            replace: true,
        });
    };

    return (
        <StyledBox className='fdc flx1'>
            <div className='fdc flx1 aic jcc'>
                <FormikForm
                    enableReinitialize
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={UserHelper.formUserRegistrationSchema}
                    className='fdc p20 w80p'
                >
                    {
                        isLoading &&
                        <CircularProgress />
                    }
                    {
                        !isLoading &&
                        <>
                            <Typography
                                fontSize={24}
                                variant={'medium'}
                            >
                                New User?
                            </Typography>
                            <Typography
                                fontSize={29}
                                variant='bold'
                            >
                                Create your profile.
                            </Typography>
                            <div className='fdc mt28 wfill mnw265'>
                                <div className='fdr'>
                                    <FormTextField
                                        name='name'
                                        label='Name'
                                        placeholder='Your Name'
                                        variant={'filled'}
                                        autoComplete={'off'}
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div className='fdr mt18'>
                                    <FormTextField
                                        name='email'
                                        label='Email'
                                        placeholder='someone@example.com'
                                        autoComplete={'off'}
                                        variant={'filled'}
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div className='fdr mt18'>
                                    <FormTextField
                                        name='password'
                                        label='Password'
                                        fullWidth
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={handleClickShowPassword}
                                                        edge='end'
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div className='mt23'>
                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        type='submit'
                                    >
                                            CREATE PROFILE
                                    </Button>
                                </div>
                            </div>
                        </>
                    }
                </FormikForm>

            </div>
        </StyledBox>
    );
};

export default Register;