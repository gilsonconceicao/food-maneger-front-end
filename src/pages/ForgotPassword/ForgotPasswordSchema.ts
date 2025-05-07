import yup from "@/Extensions/Schema/yupConfig";

export const forgotPasswordValidationSchema = yup.object().shape({
    email: yup.string()
        .typeError('Email: Precisa ser preenchido')
        .required('Email: Precisa ser preenchido')
        .email("Email: inválido")
}); 

export const forgotPasswordDefaultValues = {
    email: null
}