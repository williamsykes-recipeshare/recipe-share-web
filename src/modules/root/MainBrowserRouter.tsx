import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/redux/useAppSelector';
import { EnumUserRole } from '../../models/rights/role';
import SessionRoute from '../custom/route/SessionRoute';
import ErrorBoundary from './error/ErrorBoundary';
import NotFoundPage from './error/NotFoundPage';
import Dashboard from './Dashboard';

const MainBrowserRouter = () : React.JSX.Element => {
    const user = useAppSelector(x => x.auth.session?.user);
    return (
        <BrowserRouter
            future={{
                v7_relativeSplatPath: false,
                v7_startTransition: true,
            }}
        >
            {
                process.env.NODE_ENV !== 'production' &&
                <div className={'fdr aic jcc'}>
                    <Typography className={'posa top16 zi2'} color={'red'} fontSize={36}>{process.env.NODE_ENV?.toUpperCase()}</Typography>
                </div>
            }
            <ErrorBoundary>
                <Routes>
                    <Route element={<SessionRoute />}>
                        <Route path={'*'} element={<NotFoundPage />} />
                        {
                            user?.roleId === EnumUserRole.User &&
                            <>
                                <Route path={'/'} element={<Dashboard />} />
                            </>
                        }
                        {
                            user?.roleId === EnumUserRole.Admin &&
                            <>
                                {/* Admin User Routes would go here */}
                            </>
                        }
                    </Route>
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default MainBrowserRouter;