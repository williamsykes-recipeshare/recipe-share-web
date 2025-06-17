import { AnyObject, ObjectSchema } from 'yup';
import { Yup, YupSchema } from '../../services/helper/yup';
import { IBase } from '../base';
import { IUserRight } from './userRight';
import { v4 } from 'uuid';
import { EnumUserRole } from './enum';

export interface IUser extends IBase {
    guid : string;
    role : EnumUserRole;
    name : string;
    email : string;
    lastLogin : string | null;

    userRights : Array<IUserRight> | null;
    userPassword : { password : string } | null;
}

export interface ILoginFormValue {
    username : string;
    password : string;
}

export interface IUserFormValue {
    id : number;
    guid : string;
    role : EnumUserRole;
    name : string;
    email : string;
    rightIds : Array<number>;
    isActive : boolean;

    password : string | null;
    verifyPassword : string | null;
}

export interface IUserRegistrationFormValue {
    name : string;
    surname : string;
    email : string;
    password : string;

    creativeCommonsLicenseAgreed : boolean;
    popiaAgreed : boolean;
}

export interface IPasswordFormValue {
    password : string;
    verifyPassword : string;
}

type YupLoginShape = Record<keyof ILoginFormValue, YupSchema>;
type YupUserShape = Record<keyof IUserFormValue, YupSchema>;
type YupPasswordShape = Record<keyof IPasswordFormValue, YupSchema>;
type YupUserRegistrationShape = Record<keyof IUserRegistrationFormValue, YupSchema>;

export default class UserHelper {
    public static initLoginFormValues() : ILoginFormValue {
        return {
            password: '',
            username: '',
        };
    }

    public static initUserFormValues(user ?: IUser | null) : IUserFormValue {
        return {
            id: user?.id ?? 0,
            guid: user?.guid ?? v4(),
            role: user?.role ?? EnumUserRole.User,
            name: user?.name ?? '',
            email: user?.email ?? '',
            rightIds: user?.userRights?.filter(x => x.isActive).map(x => x.rightId) ?? [],
            isActive: user?.isActive ?? true,
            password: null,
            verifyPassword: null,
        };
    }

    public static initUserRegistrationFormValues() : IUserRegistrationFormValue {
        return {
            name: '',
            surname: '',
            email: '',
            password: '',

            creativeCommonsLicenseAgreed: false,
            popiaAgreed: false,
        };
    }

    public static initPasswordFormValues() : IPasswordFormValue {
        return {
            password: '',
            verifyPassword: '',
        };
    }

    public static formLoginSchema = () : ObjectSchema<AnyObject, YupLoginShape> => Yup
        .object<YupLoginShape, YupLoginShape>({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
        });

    public static formUserSchema = () : ObjectSchema<AnyObject, YupUserShape> => Yup
        .object<YupUserShape, YupUserShape>({
            id: Yup.number().required('Required'),
            guid: Yup.string().required('Required'),
            role: Yup.number().nullable().required('Required'),
            name: Yup.string().required('Required'),
            email: Yup.string().nullable().email('Invalid email').required('Required'),
            rightIds: Yup.array<AnyObject, number>().required('Required'),
            isActive: Yup.boolean().required('Required'),
            password: Yup.string()
                .nullable()
                .when('id', (id, field) => !id[0] ? field.required('Required') : field.optional())
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(/[A-Z]/, 'Password must contain an upper case letter.')
                .matches(/[a-z]/, 'Password must contain a lower case letter.')
                .matches(/[0-9]{1,}/, 'Password must contain a number.')
                .matches(/[$&+,:;=?@#|'<>.^*()%!-]/, 'Password must contain a special character.'),
            verifyPassword: Yup.string()
                .nullable()
                .when('password', (password, field) => password[0] ? field.required('Required').oneOf([Yup.ref('password')], 'Passwords must match') : field.optional()),
        });

    public static formPasswordSchema = () : ObjectSchema<AnyObject, YupPasswordShape> => Yup
        .object<YupPasswordShape, YupPasswordShape>({
            password: Yup.string()
                .required('Required.')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(/[A-Z]/, 'Password must contain an upper case letter.')
                .matches(/[a-z]/, 'Password must contain a lower case letter.')
                .matches(/[0-9]{1,}/, 'Password must contain a number.')
                .matches(/[$&+,:;=?@#|'<>.^*()%!-]/, 'Password must contain a special character.'),
            verifyPassword: Yup.string()
                .required('Required.')
                .oneOf([Yup.ref('password')], 'Passwords must match'),
        });

    public static formUserRegistrationSchema = () : ObjectSchema<AnyObject, YupUserRegistrationShape> => Yup
        .object<YupUserRegistrationShape, YupUserRegistrationShape>({
            name: Yup.string().required('Required'),
            surname: Yup.string().required('Required'),
            email: Yup.string().required('Required').email('Invalid email'),
            password: Yup.string().required('Required'),

            creativeCommonsLicenseAgreed: Yup.boolean()
                .oneOf([true], 'You must agree to the Creative Commons License'),
            popiaAgreed: Yup.boolean()
                .oneOf([true], 'You must agree to the POPIA Statement'),
        });
}