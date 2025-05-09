'use client'
import { createContext, useContext, useEffect } from 'react';
import { Control, FieldErrors, FieldValues, useForm, UseFormGetFieldState } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ObjectSchema } from 'yup';

type FormContextType = {
    setValue: ReturnType<typeof useForm>['setValue'];
    watch: ReturnType<typeof useForm>['watch'];
    getFieldState: UseFormGetFieldState<FieldValues>
    control: Control<FieldValues, unknown, {
        [x: string]: FieldValues;
    }>;
    reset: ReturnType<typeof useForm>['reset'];
    getValues: ReturnType<typeof useForm>['getValues'];
    errors: FieldErrors<FieldValues>;
    setError: ReturnType<typeof useForm>['setError'];
    submitting?: boolean;
}

const FormContext = createContext<FormContextType>({
    errors: {},
    setValue: () => { },
    watch: {} as ReturnType<typeof useForm>['watch'],
    reset: () => { },
    control: {} as Control<FieldValues, unknown, {
        [x: string]: FieldValues;
    }>,
    getValues: {} as ReturnType<typeof useForm>['getValues'], 
    setError: () => {}, 
    getFieldState: {} as UseFormGetFieldState<FieldValues>, 
    submitting: false
});

type IChildren = {
    children: React.ReactNode;
    defaultValues: FieldValues;
    validationSchema: ObjectSchema<FieldValues>;
    onSubmit: (values: FieldValues) => void;
    submitting?: boolean;
}

export const FormContextProvider: React.FC<IChildren> = ({ children, defaultValues, validationSchema, onSubmit, submitting }) => {
    const { handleSubmit, formState: { errors }, control, watch, reset, getValues, setValue, setError, getFieldState} = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultValues
    });

   useEffect(() => {
    if (Object.keys(errors ?? {})?.length >0) {
        console.log('[FormContext - Errors] - validationErrors', errors)
    };
   }, [errors]);

    return (
        <FormContext.Provider
            value={{
                errors,
                getValues,
                reset,
                control,
                setValue,
                watch,
                setError, 
                getFieldState, 
                submitting
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormContext.Provider>
    );
};


export const useFormContext = () => useContext(FormContext);