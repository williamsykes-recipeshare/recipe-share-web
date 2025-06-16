import React, { Suspense } from 'react';
import { useAppSelector } from '../../../hooks/redux/useAppSelector';
import LoginRegister from '../../root/login/LoginRegister';
import { EnumUserRole } from '../../../models/rights/role';
import Loading from '../../root/Loading';

const UserApp = React.lazy(() => import('../../root/UserApp'));

const SessionRoute = () : JSX.Element => {
    const session = useAppSelector(x => x.auth.session);

    return !session ? <LoginRegister /> : (
        <>
            {
                session.user?.roleId === EnumUserRole.User &&
                <Suspense fallback={<Loading />}>
                    <UserApp />
                </Suspense>
            }
        </>
    );
};

export default SessionRoute;