import { TextAreaFormField } from '@/components/FormFields/TextAreaFormField'
import { TextFormField } from '@/components/FormFields/TextFormField'
import { MailCheck, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type ContactFormProps = {
    isLoading: boolean;
    isSendMessage: boolean;
}

export const ContactForm = ({ isLoading, isSendMessage }: ContactFormProps) => {
    return (
        <div className='space-y-2'>
            <TextFormField
                label='Nome'
                name='name'
            />
            <TextFormField
                label='Email'
                name='email'
            />
            <TextFormField
                label='Número de telefone'
                name='phoneNumber'
                mask='phone'
            />

            <TextAreaFormField
                label='Mensagem'
                name='message'
            />

            {isSendMessage && (
                <Alert className='bg-[#07471c] border-black-200 text-white'>
                    <MailCheck className='text-white'/>
                    <AlertTitle>Mensagem enviada!</AlertTitle>
                    <AlertDescription>
                        Entratemos em contato com você o mais breve possível. Muito obrigado por entrar em contato!
                    </AlertDescription>
                </Alert>
            )}

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
