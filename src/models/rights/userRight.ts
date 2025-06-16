import { IBase } from '../base';
import { IRight } from './right';

export interface IUserRight extends IBase {
    rightId : number;
    right : IRight | null;
    userId : number;
}

export default class UserRightHelper {
    public static getParentRight(userRight : IUserRight, userRights : Array<IUserRight>) : IUserRight | undefined {
        let result : IUserRight | undefined = {...userRight};

        while (result?.right?.parentId) {
            result = userRights.find(x => x.right && x.right.id === result?.right?.parentId);
        }

        return result;
    }
}