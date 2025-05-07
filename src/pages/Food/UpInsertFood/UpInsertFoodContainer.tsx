import { FormContextProvider } from '@/contexts/FormContext'
import { UpInsertFood } from './UpInsertFood'
import { createFoodValidationSchema, createFoodDefaultValues } from './createFoodSchema'
import { useNavigate, useParams } from 'react-router'
import { FieldValues } from 'react-hook-form'
import { useUpInsertFoodMutate, useFoodByIdQuery, useUpdateFoodMutate } from '@/hooks/Foods/useFoodContext'
import toast from 'react-hot-toast'
import { Food } from '@/services/Foods/Foods.type'

export const UpInsertFoodContainer = () => {
    const { id } = useParams();
    const isModeCreate = id === 'adicionar'
    const navigate = useNavigate();

    const { data, isLoading } = useFoodByIdQuery(id);

    const onSuccess = () => {
        toast.success(isModeCreate ? 'Comida adicionada com sucesso!' : 'Sucesso ao editar comida');
        setTimeout(() => navigate('/'), 2000);
    }

    const { mutateAsync: createMutateAsync } = useUpInsertFoodMutate(onSuccess);
    const { mutateAsync: editMudateAsync } = useUpdateFoodMutate(id!, onSuccess);

    const onSubmit = async (values: FieldValues) => {
        if (isModeCreate) {
            await createMutateAsync(values as Food);
        } else {
            await editMudateAsync(values as Food)
        }
    }

    if (!isModeCreate && isLoading) {
        return <></>
    }

    return (
        <FormContextProvider {...{
            defaultValues: createFoodDefaultValues(data),
            validationSchema: createFoodValidationSchema,
            onSubmit
        }}>
            <UpInsertFood isModeCreate={isModeCreate}/>
        </FormContextProvider>
    )
}
