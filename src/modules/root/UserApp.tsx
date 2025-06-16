import React from 'react';
import { Outlet } from 'react-router-dom';

const UserApp = () : React.JSX.Element => {
    return (
        <>
            <div className='fdr hfill'>
                <div className='fdc flx1 oyh oxh'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default UserApp;