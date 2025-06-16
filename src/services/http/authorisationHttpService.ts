import axios, { AxiosResponse, Canceler, CancelTokenStatic } from 'axios';
import { IUserToken } from '../../models/rights/userToken';

export default class HttpAuthorisationService {
    private static readonly CancelToken : CancelTokenStatic = axios.CancelToken;

    public static login(email : string, password : string) : Promise<AxiosResponse<IUserToken | null>> {
        // We use create here to make sure axios does not try and send an expired token or
        // any other headers not needed, basically to ignore the interceptors.
        return axios.create({
            baseURL: API_URL,
        }).post<IUserToken | null>('api/v1/Authorisation/LogIn', {
            email,
            password,
        });
    }

    /**
     * Allows you to cancel current session request
     */
    private static cancelSession ?: Canceler;

    public static session() : Promise<AxiosResponse<IUserToken | null>> {
        if (this.cancelSession) {
            this.cancelSession();
        }

        return axios.get<IUserToken | null>('api/v1/Authorisation/GetSession', {
            cancelToken: new this.CancelToken((c) => {
                this.cancelSession = c;
            }),
        });
    }

    public static logout() : Promise<AxiosResponse<unknown>> {
        return axios.get('api/v1/Authorisation/Logout');
    }
}