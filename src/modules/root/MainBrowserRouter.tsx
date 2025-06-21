import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux/useAppSelector';
import SessionRoute from '../custom/route/SessionRoute';
import ErrorBoundary from './error/ErrorBoundary';
import NotFoundPage from './error/NotFoundPage';
import Dashboard from './Dashboard';
import { EnumUserRole } from '../../models/rights/enum';
import PublicDashboard from './PublicDashboard';
import LoginRegister from './login/LoginRegister';

const MainBrowserRouter = () : React.JSX.Element => {
    const user = useAppSelector(x => x.auth.session?.user);
    return (
        <BrowserRouter
            future={{
                v7_relativeSplatPath: false,
                v7_startTransition: true,
            }}
        >
            <ErrorBoundary>
                <Routes>
                    <Route element={<SessionRoute />}>
                        <Route path={'*'} element={<NotFoundPage />} />
                        <>
                            <Route path={'/'} element={<PublicDashboard />} />
                            <Route
                                path='/login'
                                element={
                                    !!user ? <Navigate to='/' replace /> : <LoginRegister />
                                }
                            />
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