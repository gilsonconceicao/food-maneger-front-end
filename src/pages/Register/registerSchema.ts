import yup from "@/Extensions/Schema/yupConfig";

export const registerValidationSchema = yup.object().shape({
    displayName: yup.string()
        .typeError('Nome: Precisa ser preenchido')
        .required('Nome: Precisa ser preenchido'),
    email: yup.string()
        .typeError('Email: Precisa ser preenchido')
        .required('Email: Precisa ser preenchido').email("Email: inválido"),
    password: yup.string()
        .typeError('Senha: Precisa ser preenchido')
        .required('Senha: Precisa ser preenchido')
        .min(6, "A senha deve conter pelo menos 6 digitos"),
    phoneNumber: yup.string().typeError('CPF: Precisa ser preenchido').required('CPF: Precisa ser preenchido').phoneNumberValidate()
});

export const registerDefaultValues = {
    email: null,
    password: null,
    displayName: null,
    phoneNumber: null
}