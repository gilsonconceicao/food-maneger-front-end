import yup from "@/Extensions/Schema/yupConfig";
import { PaymentMethod } from "@/services/Payment/Payment.type";

export const paymentCheckoutSchemaValidationSchema = (paymentMethod: PaymentMethod) => {
  console.log('paymentMethod', paymentMethod);
  return yup.object().shape({
    cardNumber: yup.string()
      .typeError('Número do Cartão: Precisa ser preenchido')
      .required('Número do Cartão: Precisa ser preenchido')
      .matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Número do Cartão: Formato inválido'),

    cardName: yup.string()
      .typeError('Nome no Cartão: Precisa ser preenchido')
      .required('Nome no Cartão: Precisa ser preenchido'),

    expiry: yup
      .string()
      .typeError('Validade: Precisa ser preenchido')
      .required('Validade: Precisa ser preenchido')
      .matches(
        /^(0[1-9]|1[0-2])\/\d{2}$/,
        'Validade: Formato inválido. Use MM/AA'
      ),

    cvv: yup.string()
      .typeError('CVV: Precisa ser preenchido')
      .required('CVV: Precisa ser preenchido')
      .matches(/^\d{3}$/, 'CVV: Formato inválido'),

    identificationNumber: yup.string()
      .typeError('CPF do titular: Precisa ser preenchido')
      .required('CPF do titular: Precisa ser preenchido')
      .registrationNumberValidate(),

    installments: yup.string()
      .typeError('Quantidade de parcelas: Precisa ser selecionado')
      .required('Quantidade de parcelas: Precisa ser selecionado')
  });
};

export const paymentCheckoutDefaultValues = {
  cardNumber: null,
  cardName: null,
  expiry: null,
  cvv: null,
  installments: null, 
  identificationNumber: null
}