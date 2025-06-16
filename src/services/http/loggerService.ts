import { IErrorInformation } from '../../models/errorInformation';
import axios from 'axios';

export default class HttpLoggerService {
    public static async log(error : IErrorInformation) : Promise<void> {
        await axios.post('api/v1/Logger/Log', error);
    }
}