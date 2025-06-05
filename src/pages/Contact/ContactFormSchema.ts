import yup from "@/Extensions/Schema/yupConfig";

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
    phone: yup.string()
        .typeError('Número de telefone: Precisa ser preenchido')
        .required('Número de telefone: Precisa ser preenchido')
        .phoneNumberValidate(),
});

export const contactFormDefaultValues = {
    email: null,
    name: null,
    message: null,
    phone: null
}