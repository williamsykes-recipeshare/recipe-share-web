export interface IErrorInformation {
    id : string | null;
    version : string | null;
    commitHash : string | null;
    path : string | null;
    environment : string | null;
    name : string | null;
    message : string | null;
    stack : string | null;
    componentStack : string | null;
    date : number;
}