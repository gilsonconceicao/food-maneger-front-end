import { FormContextProvider } from '@/contexts/FormContext'
import { UpInsertFood } from './UpInsertFood'
import { createFoodValidationSchema, createFoodDefaultValues } from './createFoodSchema'
import { useNavigate, useParams } from 'react-router'
import { FieldValues } from 'react-hook-form'
import { useUpInsertFoodMutate, useFoodByIdQuery, useUpdateFoodMutate, useDeleteFoodMutate } from '@/hooks/Foods/useFoodContext'
import toast from 'react-hot-toast'
import { IFood } from '@/services/Foods/Foods.type'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Modal } from '@/components/Modal/Modal'

export const UpInsertFoodContainer = () => {
    const { id } = useParams();
    const isModeCreate = id === 'adicionar'
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [signalAction, setSignalAction] = useState<string | undefined>(undefined);
    const onClose = () => setSignalAction(undefined); 

    const { data, isLoading, refetch } = useFoodByIdQuery(id);

    const onSuccess = async (type?: string) => {
        if (type !== undefined) {
            const mapMessage: { [type: string]: string } = {
                'delete': "Sucesso excluir comida"
            }
            
            toast.success(mapMessage[type!])
        } else {
            toast.success(isModeCreate ? 'Comida adicionada com sucesso!' : 'Sucesso ao editar comida');
        }

        setTimeout(async () => {
            refetch();
            await queryClient.refetchQueries({
                queryKey: ['food-get-list']
            })
            navigate('/');
        }, 1000);

        onClose();
    }

    const { mutateAsync: createMutateAsync } = useUpInsertFoodMutate(() => onSuccess());
    const { mutateAsync: editMudateAsync } = useUpdateFoodMutate(id!, () => onSuccess());
    const { mutateAsync: deleteMutateAsync, isPending:isDeletePending} = useDeleteFoodMutate(id!, () => onSuccess('delete'));

    const onSubmit = async (values: FieldValues) => {
        if (isModeCreate) {
            await createMutateAsync(values as IFood);
        } else {
            await editMudateAsync(values as IFood)
        }
    }

    if (!isModeCreate && isLoading) {
        return <></>
    }

    return (
        <div>
            <FormContextProvider {...{
                defaultValues: createFoodDefaultValues(data),
                validationSchema: createFoodValidationSchema,
                onSubmit
            }}>
                <UpInsertFood isModeCreate={isModeCreate} onDeleteFood={() => setSignalAction('delete')} />
            </FormContextProvider>

            <Modal
                open={signalAction === 'delete'}
                onOpenChange={onClose}
                title="Excluir comida"
                description="Você tem certeza que deseja excluir essa comida do sistema?"
                confirmText="Excluir"
                cancelText="Fechar"
                onConfirm={() => deleteMutateAsync()}
                onCancel={onClose}
                loading={isDeletePending}
            />
        </div>
    )
}
