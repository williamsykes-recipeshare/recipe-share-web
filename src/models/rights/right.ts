import { IBase } from '../base';
import { EnumRightType } from './enum';

export interface IRight extends IBase {
    parentId : number | null;
    code : string;
    name : string;
    url : string | null;
    isMenu : boolean | null;
    type : EnumRightType;
}

export enum EnumUserRight {
    Rights = 1,
    UserRights = 2,
    MasterData = 3,
}