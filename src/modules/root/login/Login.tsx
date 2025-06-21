import { Box, Button, CircularProgress, styled, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import UserHelper, { ILoginFormValue } from '../../../models/rights/user';
import { useAppDispatch } from '../../../hooks/redux/useAppDispatch';
import AuthThunk from '../../../store/auth/thunk';
import FormTextField from '../../custom/textField/FormTextField';
import { useAppSelector } from '../../../hooks/redux/useAppSelector';
import themeVariables from '../../../theme/themeVariables';
import FormikForm from '../../custom/FormikForm';
import { useNavigate } from 'react-router-dom';

const StyledBox = styled(Box)`
    background: linear-gradient(to bottom,
        ${themeVariables.colors.material.background.default},
        ${themeVariables.colors.material.white.main}
    );
`;

const Login = () : React.JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(x => x.auth.isLoading);

    const initialValues = useMemo(() => UserHelper.initLoginFormValues(), []);

    const onSubmit = async (values : ILoginFormValue) : Promise<void> => {
        dispatch(AuthThunk.login({ ...values }));
        navigate('/', {
            replace: true,
        });
    };

    return (
        <StyledBox className='fdc aic jcc'>
            <FormikForm
                enableReinitialize
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={UserHelper.formLoginSchema}
                className='fdc aic jcsb'
            >
                {
                    isLoading &&
                    <CircularProgress color='secondary' />
                }
                {
                    !isLoading &&
                    <>
                        <div className={'fdc aifs jcc mxw495 mnw265 p20'}>
                            <Typography
                                fontSize={{ xs: 29, sm: 35 }}
                            >
                                Welcome to RecipeShare
                            </Typography>
                            <div className='mt18'>
                                <Typography fontSize={18} color='grey-900' variant='medium'>
                                    A web application where users can create, browse, and discover recipes.
                                    They can add ingredients, detailed steps, and categorize recipes with tags,
                                    making it easy to find and organize different dishes.
                                </Typography>
                            </div>
                            <div className='mt38'>
                                <Typography fontSize={29} color='primary-dark' variant='bold'>
                                    Login to your profile.
                                </Typography>
                            </div>
                            <div className='fdc flx1 wfill mt23'>
                                <FormTextField
                                    name='username'
                                    placeholder='Email*'
                                    variant='outlined'
                                    type='email'
                                    fullWidth
                                    required
                                />
                                <div className={'fdr flx1 wfill'}>
                                    <div className='flx5 mr5'>
                                        <FormTextField
                                            name='password'
                                            label='Password*'
                                            variant='outlined'
                                            fullWidth
                                            required
                                        />
                                    </div>
                                    <div className='flx3 mxh56 pb20'>
                                        <Button
                                            color='primary'
                                            variant='outlined'
                                            type='submit'
                                            fullWidth
                                            sx={{ margin: 0 }}
                                        >
                                            LOG IN
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </FormikForm>
        </StyledBox>
    );
};

export default Login;