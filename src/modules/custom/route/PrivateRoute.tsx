import React, { useMemo } from 'react';
import { PathRouteProps } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux/useAppSelector';
import NotAuthorised from '../../root/error/NotAuthorised';

interface IPrivateRouteProps extends PathRouteProps {
    rightId : number;

    component : React.JSX.Element;
}

const PrivateRoute = (props : IPrivateRouteProps) : React.JSX.Element => {
    const session = useAppSelector(x => x.auth.session);

    const hasRight = useMemo(() => {
        if (!session) return false;

        let userRight = session.user?.userRights?.find(x => x.rightId === props.rightId);

        if (!userRight) return false;

        return true;

    }, [session, props.rightId]);

    return !hasRight ? <NotAuthorised /> : props.component;
};

export default PrivateRoute;