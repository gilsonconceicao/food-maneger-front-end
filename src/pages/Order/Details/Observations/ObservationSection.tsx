import { TextAreaFormField } from '@/components/FormFields/TextAreaFormField'
import { FormContextProvider } from '@/contexts/FormContext';
import { MessageSquare, Save } from 'lucide-react'
import { observationSectionDefaultValues, observationSectionValidationSchema } from './ObservationSectionSchema';
import { FieldValues } from 'react-hook-form';
import { useUpdateOrderMutate } from '@/hooks/Order/useOrderHook';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

type ObservationSectionProps = {
    refetchOrder: () => void;
    orderId: string;
    enable: boolean; 
    observations: string
}

export const ObservationSection = ({ orderId, refetchOrder, enable, observations }: ObservationSectionProps) => {
    const { mutateAsync, isPending } = useUpdateOrderMutate(orderId, () => {
        toast.success("Observações adicionada com sucesso");
        refetchOrder();
    });

    const onSubmit = (values: FieldValues) => {
        mutateAsync(values);
    }

    return (
        <FormContextProvider
            defaultValues={observationSectionDefaultValues(observations)}
            validationSchema={observationSectionValidationSchema}
            onSubmit={onSubmit}
            submitting={isPending || !enable}
        >
            <div className="mb-8 bg-card-shadow rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                    <MessageSquare className="w-5 h-5 text-orange-500 mt-0.5" />
                    <h2 className="text-lg font-semibold">Observações do Pedido</h2>
                </div>
                <div className="space-y-4">
                    <TextAreaFormField
                        name='observations'
                        label='Observações'
                        placeholder='Adicione observações especiais para seu pedido...'
                    />
                    <Button
                        type='submit'
                        disabled={isPending || !enable}
                        variant='outline'
                    >
                        {isPending ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                Salvando...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Salvar observações
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </FormContextProvider>
    )
}
