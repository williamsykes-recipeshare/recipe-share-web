import React, { Suspense } from 'react';
import Loading from '../../root/Loading';

const UserApp = React.lazy(() => import('../../root/UserApp'));

const SessionRoute = () : JSX.Element => {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <UserApp />
            </Suspense>
        </>
    );
};

export default SessionRoute;