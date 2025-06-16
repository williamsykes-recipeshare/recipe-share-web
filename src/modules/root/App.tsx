import '../../style/colors.scss';
import '../../style/cursor.scss';
import '../../style/display.scss';
import '../../style/overflow.scss';
import '../../style/padding.scss';
import '../../style/position.scss';
import React, { Suspense } from 'react';
import { useAppSelector } from '../../hooks/redux/useAppSelector';
import useSession from '../../hooks/rights/useSession';
import Snackbars from '../custom/snackbar/Snackbars';
import Loading from './Loading';

const MainBrowserRouter = React.lazy(() => import('./MainBrowserRouter'));

const App = () : React.JSX.Element => {
    const isLoading = useAppSelector(x => x.auth.isLoading);

    useSession();

    return (
        <>
            {
                isLoading &&
                <Loading />
            }
            {
                !isLoading &&
                <Suspense fallback={(<Loading />)}>
                    <MainBrowserRouter />
                </Suspense>
            }
            <Snackbars />
        </>

    );
};

export default App;