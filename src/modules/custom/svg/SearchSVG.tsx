import React from 'react';

type ISearchSVGProps = React.SVGProps<SVGSVGElement>

const SearchSVG = (props : ISearchSVGProps) : React.ReactElement => {
    return (
        <svg viewBox='0 0 21.12 21.12' xmlns='http://www.w3.org/2000/svg' {...props}>
            <path d='M16.894,14.084a8.352,8.352,0,1,0-2.812,2.809L19.75,22.56l2.81-2.812Zm-7.121.845a5.153,5.153,0,1,1,5.155-5.15,5.161,5.161,0,0,1-5.155,5.15Z' transform='translate(-1.44 -1.44)'/>
        </svg>
    );
};

export default SearchSVG;