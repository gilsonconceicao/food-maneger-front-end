import yup from "@/Extensions/Schema/yupConfig";

export const loginValidationSchema = yup.object().shape({
    email: yup.string()
        .typeError('Email: Precisa ser preenchido')
        .required('Email: Precisa ser preenchido')
        .email("Email: inválido"), 
    password: yup.string()
        .typeError('Senha: Precisa ser preenchido')
        .required('Senha: Precisa ser preenchido')
}); 

export const loginDefaultValues = {
    email: null, 
    password: null
}