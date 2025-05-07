import yup from "@/Extensions/Schema/yupConfig";
import { Food } from "@/services/Foods/Foods.type";

export const createFoodValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required("O nome é obrigatório.")
        .min(2, "O nome deve ter no mínimo 2 caracteres."),

    url: yup
        .string()
        .required("A URL da imagem é obrigatória."),

    price: yup
        .number()
        .typeError("O preço deve ser um número.")
        .required("O preço é obrigatório.")
        .positive("O preço deve ser maior que zero."),

    category: yup
        .string()
        .required("A categoria é obrigatória."),

    description: yup
        .string()
        .required("A descrição é obrigatória.")
        .min(5, "A descrição deve ter no mínimo 5 caracteres."),
});

export const createFoodDefaultValues = (data?: Food) => {
    if (data !== undefined) return data; 
    return {    
        name: null,
        url: null,
        price: 0,
        category: null,
        description: null,}
}