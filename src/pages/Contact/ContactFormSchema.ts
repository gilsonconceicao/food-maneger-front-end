import yup from "@/Extensions/Schema/yupConfig";
import { FieldValues } from "react-hook-form";

export const contactFormValidationSchema = yup.object().shape({
    email: yup.string()
        .typeError('Email: Precisa ser preenchido')
        .required('Email: Precisa ser preenchido')
        .email("Email: inválido"),
    name: yup.string()
        .typeError('Nome: Precisa ser preenchido')
        .required('Nome: Precisa ser preenchido'),
    message: yup.string()
        .typeError('Mensagem: Precisa ser preenchido')
        .required('Mensagem: Precisa ser preenchido'),
    phoneNumber: yup.string()
        .typeError('Número de telefone: Precisa ser preenchido')
        .required('Número de telefone: Precisa ser preenchido')
        .phoneNumberValidate(),
});

export const contactFormDefaultValues = (user: FieldValues | null) => {
    return {
        email: user?.email ?? null,
        name: user?.name ?? null,
        message: null,
        phoneNumber: user?.phone ?? null
    }
}