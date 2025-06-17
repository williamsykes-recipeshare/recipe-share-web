import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/redux/useAppSelector';
import SessionRoute from '../custom/route/SessionRoute';
import ErrorBoundary from './error/ErrorBoundary';
import NotFoundPage from './error/NotFoundPage';
import Dashboard from './Dashboard';
import { EnumUserRole } from '../../models/rights/enum';
import PublicDashboard from './PublicDashboard';

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
                // TODO: add back later it's just a bit annoying right now
                // process.env.NODE_ENV !== 'production' &&
                // <div className={'fdr aic jcc'}>
                //     <Typography className={'posa top16 zi2'} color={'red'} fontSize={36}>{process.env.NODE_ENV?.toUpperCase()}</Typography>
                // </div>
            }
            <ErrorBoundary>
                <Routes>
                    <Route element={<SessionRoute />}>
                        <Route path={'*'} element={<NotFoundPage />} />
                        <>
                            <Route path={'/'} element={<PublicDashboard />} />
                        </>
                        {
                            user?.role === EnumUserRole.User &&
                            <>
                                <Route path={'/'} element={<Dashboard />} />
                            </>
                        }
                        {
                            user?.role === EnumUserRole.Admin &&
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