import { IBase } from '../base';
import { IUser } from './user';

export interface IUserToken extends Omit<IBase,
'createdById'
| 'createdByName'
| 'updatedById'
| 'updatedByName'> {
    userId : number;
    user : IUser | null;
    guid : string;
    expirationDate : string;
    token : string;
}