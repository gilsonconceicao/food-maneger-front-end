import yup from "@/Extensions/Schema/yupConfig";

export const observationSectionValidationSchema = yup.object().shape({
    observations: yup.string()
        .typeError('Observações: Precisa ser preenchido')
        .required('Observações: Precisa ser preenchido')
});

export const observationSectionDefaultValues = (observations: string) => ({
    observations: observations ?? null
})