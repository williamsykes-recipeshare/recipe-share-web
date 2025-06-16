import React, { useMemo } from 'react';
import { Outlet, PathRouteProps } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux/useAppSelector';
import useSetPageTitle from '../../../hooks/route/useSetPageTitle';
import UserRightHelper from '../../../models/rights/userRight';

interface IPrivateParentRouteProps extends PathRouteProps {
    rightId : number;
}

const PrivateParentRoute = (props : IPrivateParentRouteProps) : JSX.Element => {
    const setPageTitle = useSetPageTitle();
    const session = useAppSelector(x => x.auth.session);

    const hasRight = useMemo(() => {
        if (!session) return false;

        let userRight = session.user?.userRights?.find(x => x.rightId === props.rightId);

        // We get the parent right here for setting the page title.
        if (userRight?.right?.parentId) {
            userRight = UserRightHelper.getParentRight(userRight, session.user?.userRights ?? []);
        }

        if (!userRight) return false;

        setPageTitle(userRight.right?.name ?? '');
        return true;

    }, [session, props.rightId, setPageTitle]);

    return !hasRight ? <div>{'You don\'t have access to this page.'}</div> : <Outlet />;
};

export default PrivateParentRoute;