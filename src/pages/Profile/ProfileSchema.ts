import yup from "@/Extensions/Schema/yupConfig";

export const profileValidationSchema = yup.object().shape({
  email: yup.string().notRequired().nullable(),
  name: yup.string()
    .typeError('Nome: Precisa ser preenchido')
    .required('Nome: Precisa ser preenchido'),
  phoneNumber: yup.string()
    .typeError('Número de telefone: Precisa ser preenchido')
    .required('Número de telefone: Precisa ser preenchido')
    .phoneNumberValidate(),
  address: yup.object().shape({
    city: yup.string().typeError('Cidade: Precisa ser preenchido').required('Cidade: Precisa ser preenchido'),
    state: yup.string().typeError('Estádo: Precisa ser preenchido').required('Estádo: Precisa ser preenchido'),
    street: yup.string().typeError('Rua: Precisa ser preenchido').required('Rua: Precisa ser preenchido'),
    number: yup.string().typeError('Número: Precisa ser preenchido').required('Número: Precisa ser preenchido'),
    zipCode: yup.string().typeError('CEP: Precisa ser preenchido').required('CEP: Precisa ser preenchido'),
  })
});

export const profileDefaultValues = {
  email: null,
  name: null,
  address: null,
  phoneNumber: null
}