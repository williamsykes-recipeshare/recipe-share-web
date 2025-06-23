import { useParams } from 'react-router-dom';

const useParameter : (name : string) => string | null | undefined = (name : string) => {
    const params = useParams<Record<string, string>>();

    if (!params[name]) return null;

    return params[name];
};

export default useParameter;