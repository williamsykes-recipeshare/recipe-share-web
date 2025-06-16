import React from 'react';
import '../../style/margin.scss';
import '../../style/flex.scss';
import '../../style/height.scss';
import '../../style/width.scss';
import '../../style/border.scss';
import '../../style/root/loading.scss';

const Loading = () : React.JSX.Element => {
    return (
        <div className='main-loading hfill fdc flx1 aic jcc'>
            <img className='pulse' alt='loading' src='/assets/images/fav/web-app-manifest-192x192.png' />
        </div>
    );
};

export default Loading;