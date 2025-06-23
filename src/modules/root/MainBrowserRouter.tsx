import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux/useAppSelector';
import SessionRoute from '../custom/route/SessionRoute';
import ErrorBoundary from './error/ErrorBoundary';
import NotFoundPage from './error/NotFoundPage';
import { EnumUserRole } from '../../models/rights/enum';
import PublicDashboard from './PublicDashboard';
import LoginRegister from './login/LoginRegister';
import RecipeView from '../recipe/RecipeView';

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
                            <Route path={'/recipe/:id'} element={<RecipeView />} />
                            <Route
                                path='/login'
                                element={
                                    !!user ? <Navigate to='/' replace /> : <LoginRegister />
                                }
                            />
                        </>
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