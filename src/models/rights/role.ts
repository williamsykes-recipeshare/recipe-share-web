import { IBase } from '../base';

export interface IRole extends IBase {
    code : string;
    name : string;
}

export enum EnumUserRole {
    Admin = 1,
    User = 2,
}