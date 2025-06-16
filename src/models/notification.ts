import { VariantType } from 'notistack';

export interface INotification {
    message : React.ReactNode;
    options : {
        variant : VariantType;
    } | undefined;
}

export interface ISnackbarNotification extends INotification {
    key : number;
}