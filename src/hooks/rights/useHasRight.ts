import { useMemo } from 'react';
import { useAppSelector } from '../redux/useAppSelector';
import { EnumUserRight } from '../../models/rights/right';

const useHasRight = (rightId : EnumUserRight) : boolean => {
    const userRights = useAppSelector(x => x.auth.session?.user?.userRights);

    return useMemo<boolean>(() => {
        if (!userRights) return false;

        return userRights.some(x => x.rightId === rightId && x.isActive);
    }, [userRights, rightId]);
};

export default useHasRight;