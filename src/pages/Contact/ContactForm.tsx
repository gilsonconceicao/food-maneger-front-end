import { TextAreaFormField } from '@/components/FormFields/TextAreaFormField'
import { TextFormField } from '@/components/FormFields/TextFormField'
import { Send } from 'lucide-react';

type ContactFormProps = {
    isLoading: boolean;
}

export const ContactForm = ({ isLoading }: ContactFormProps) => {
    return (
        <div className='space-y-2'>
            <TextFormField
                label='Nome completo'
                name='name'
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextFormField
                    label='Email'
                    name='email'
                />
                <TextFormField
                    label='Número de telefone'
                    name='phone'
                    mask='phone'
                />
            </div>

            <TextAreaFormField
                label='Mensagem'
                name='message'
            />

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 text-white mt-4 p-2 cursor-pointer rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        Enviando...
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        Enviar
                    </>
                )}
            </button>
        </div>
    )
}
