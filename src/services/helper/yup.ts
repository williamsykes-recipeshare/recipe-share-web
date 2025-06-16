import moment from 'moment';
import { AnyObjectSchema, AnySchema, boolean, object, string, array, number, mixed, ref, addMethod, date, DateSchema, lazy } from 'yup';

export type YupSchema = AnySchema | AnyObjectSchema;

declare module 'yup' {
    interface DateSchema {
      moment() : DateSchema;
    }
}

addMethod<DateSchema>(date, 'moment', () => {
    return date().transform((value : moment.Moment | null) => {
        if (Yup.date().isType(value)) return value;

        if (!value) return null;

        return moment(value).isValid() ? value.toDate() : null;
    });
});

export class Yup {
    public static object = object;
    public static number = number;
    public static string = string;
    public static array = array;
    public static boolean = boolean;
    public static mixed = mixed;
    public static date = date;
    public static ref = ref;
    public static lazy = lazy;
}
