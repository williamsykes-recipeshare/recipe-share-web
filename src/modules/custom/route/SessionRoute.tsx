import React, { Suspense } from 'react';
import { useAppSelector } from '../../../hooks/redux/useAppSelector';
import Loading from '../../root/Loading';
import { EnumUserRole } from '../../../models/rights/enum';
import PublicDashboard from '../../root/PublicDashboard';

const UserApp = React.lazy(() => import('../../root/UserApp'));

const SessionRoute = () : JSX.Element => {
    const session = useAppSelector(x => x.auth.session);

    return !session ? <PublicDashboard /> : (
        <>
            {
                session.user?.role === EnumUserRole.User &&
                <Suspense fallback={<Loading />}>
                    <UserApp />
                </Suspense>
            }
        </>
    );
};

export default SessionRoute;