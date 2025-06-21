import React from 'react';
import Login from './Login';
import Register from './Register';

const LoginRegister = () : React.JSX.Element => {
    return (
        <div className='fdr flx1 hfill fww oya oxh'>
            <div className='fdc jcc flx1'>
                <Login />
            </div>
            <div className='fdc jcc flx1'>
                <Register />
            </div>
        </div>
    );
};

export default LoginRegister;