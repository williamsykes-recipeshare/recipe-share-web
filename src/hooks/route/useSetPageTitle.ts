import { useCallback } from 'react';

const useSetPageTitle = () : (title : string) => void => {
    return useCallback((title : string) => {
        let result = DOCUMENT_NAME;

        if (process.env.NODE_ENV !== 'production') {
            result += ` - ${process.env.NODE_ENV}`;
        }

        document.title = `${result} - ${title}`;
    }, []);
};

export default useSetPageTitle;