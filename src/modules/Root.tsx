import React, { Suspense } from 'react';
import theme from '../theme/material';
import { GlobalStyles, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { SnackbarProvider } from 'notistack';
import store from '../store';
import SuccessSnackbarMaterialDesignContent from './custom/snackbar/Success';
import ErrorSnackbarMaterialDesignContent from './custom/snackbar/Error';
import WarningSnackbarMaterialDesignContent from './custom/snackbar/Warning';
import InfoSnackbarMaterialDesignContent from './custom/snackbar/Info';
import ErrorBoundary from './root/error/ErrorBoundary';
import Loading from './root/Loading';
import useFontAwesome from '../hooks/fontawesome/useFontAwesomeIcons';

const App = React.lazy(() => import('./root/App'));

const AppRoot = () : React.JSX.Element => {
    useFontAwesome();

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles
                styles={(a) => ({
                    '::-webkit-scrollbar': {
                        width: '10px',
                        height: '10px',
                    },
                    '::-webkit-scrollbar-track': {
                        background: a.palette.grey[100],
                    },
                    '::-webkit-scrollbar-thumb': {
                        background: a.palette.primary.dark,
                    },
                    '::-webkit-scrollbar-thumb:hover': {
                        background: a.palette.primary.main,
                    },
                })}
            />
            <ErrorBoundary>
                <Provider store={store}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <SnackbarProvider
                            maxSnack={4}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            Components={{
                                success: SuccessSnackbarMaterialDesignContent,
                                error: ErrorSnackbarMaterialDesignContent,
                                warning: WarningSnackbarMaterialDesignContent,
                                info: InfoSnackbarMaterialDesignContent,
                            }}
                        >
                            <Suspense fallback={<Loading />}>
                                <App />
                            </Suspense>
                        </SnackbarProvider>
                    </LocalizationProvider>
                </Provider>
            </ErrorBoundary>
        </ThemeProvider>
    );
};

export default AppRoot;