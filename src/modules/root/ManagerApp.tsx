import React from 'react';
import { Outlet } from 'react-router-dom';

const ManagerApp = () : React.JSX.Element => {
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

export default ManagerApp;