export interface IBase {
    id : number;
    isActive : boolean | null;
    createdById : number;
    createdByName : string;
    createdOn : string | null;
    updatedById : number;
    updatedByName : string;
    updatedOn : string | null;
}