import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';
import '@fontsource/montserrat-alternates';
import './style/index.scss';
import './extensions';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

if (process.env.NODE_ENV !== 'production') {
    console.warn(process.env.NODE_ENV);
}


const Root = React.lazy(() => import('./modules/Root'));

const Index = () : React.JSX.Element => (
    // <React.StrictMode>
    <Suspense fallback={<div />}>
        <Root />
    </Suspense>
    // </React.StrictMode>
);

const rootDomElement = document.getElementById('root');

if (rootDomElement) {
    const root = ReactDOM.createRoot(rootDomElement);
    root.render(<Index />);
}
