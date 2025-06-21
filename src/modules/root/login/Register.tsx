import React, { useMemo } from 'react';
import UserHelper, { IUserRegistrationFormValue } from '../../../models/rights/user';
import { Box, Button, CircularProgress, styled, Typography } from '@mui/material';
import FormTextField from '../../custom/textField/FormTextField';
import { useAppSelector } from '../../../hooks/redux/useAppSelector';
import AuthThunk from '../../../store/auth/thunk';
import { useAppDispatch } from '../../../hooks/redux/useAppDispatch';
import themeVariables from '../../../theme/themeVariables';
import moment from 'moment';
import FormikForm from '../../custom/FormikForm';

const StyledBox = styled(Box)`
    background-color: ${themeVariables.colors.material.primary.main};
`;

const Register = () : React.JSX.Element => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(x => x.auth.isLoading);

    const initialValues = useMemo(() => UserHelper.initUserRegistrationFormValues(), []);

    const onSubmit = async (values : IUserRegistrationFormValue) : Promise<void> => {
        const password = moment(values.password).format('DDMMYYYY');
        dispatch(AuthThunk.register({
            ...values,
            password,
        }));
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
                                        variant='filled'
                                        fullWidth
                                        required
                                    />
                                </div>
                                <div className='fdr mt18'>
                                    <FormTextField
                                        name='email'
                                        label='Email'
                                        type='email'
                                        placeholder='someone@example.com'
                                        variant={'filled'}
                                        fullWidth
                                        required
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