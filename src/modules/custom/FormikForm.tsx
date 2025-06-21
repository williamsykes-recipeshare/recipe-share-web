import React, { useCallback, useEffect } from 'react';
import { DefaultValues, FieldValues, Resolver, useForm, FormState, FormProvider, UseFormReset, UseFormGetValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObject, ObjectSchema } from 'yup';

export interface IFormikFormProps<T extends FieldValues> {
    children : ((props : FormState<T>, getValues : UseFormGetValues<T>) => React.ReactNode) | React.ReactNode;

    initialValues : DefaultValues<T> | ((payload ?: unknown) => Promise<T>);

    onSubmit : (data : T, state : FormState<T>, event ?: React.BaseSyntheticEvent) => Promise<void>;
    validationSchema ?: () => ObjectSchema<AnyObject, AnyObject, object, ''>;

    enableReinitialize ?: boolean;
    className ?: string;

    validateOnMount ?: boolean;
}

const FormikForm = function <T extends FieldValues>(props : IFormikFormProps<T>) : JSX.Element {
    const { initialValues, enableReinitialize } = props;
    const {
        reset,
        handleSubmit,
        ...form
    } = useForm<T>({
        defaultValues: initialValues,
        resolver: !props.validationSchema ? undefined : yupResolver(props.validationSchema(), {}, {
            mode: 'sync',
        }) as unknown as Resolver<T>, // Jank but works, fuck types
        reValidateMode: 'onChange',
        mode: 'all',
    });

    const onSubmit = handleSubmit(async (data, event) => {
        try {
            await props.onSubmit(data, form.formState, event);
        } catch {
            // Form ignores async errors, middleware should handle it
        }
    });

    const onForumSubmit = useCallback((event : React.FormEvent<HTMLFormElement>) => {
        event.stopPropagation();
        event.preventDefault();
        onSubmit(event);
    }, [onSubmit]);

    const resetValues = useCallback((values : DefaultValues<T> | ((payload ?: unknown) => Promise<T>), valuesReset : UseFormReset<T>) => {
        if (typeof values === 'function') {
            values().then(valuesReset).catch(console.error);
        } else {
            valuesReset(values);
        }
    }, []);

    useEffect(() => {
        if (!enableReinitialize) return;

        resetValues(initialValues, reset);

    }, [enableReinitialize, reset, resetValues, initialValues]);

    const onReset = () : void => {
        resetValues(initialValues, reset);
    };

    return (
        <FormProvider {...form} reset={reset} handleSubmit={handleSubmit}>
            <form
                onSubmit={onForumSubmit}
                onReset={onReset}
                className={props.className}
                noValidate
            >
                {
                    props.children &&
                    typeof props.children === 'function' &&
                    props.children(form.formState, form.getValues)
                }
                {
                    props.children &&
                    typeof props.children !== 'function' &&
                    props.children
                }
            </form>
        </FormProvider>

    );
};

export default FormikForm;