import { Phone, Mail } from 'lucide-react';
import { FormContextProvider } from '@/contexts/FormContext';
import { ContactForm } from './ContactForm';
import { contactFormDefaultValues, contactFormValidationSchema } from './ContactFormSchema';
import { useAuthContext } from '@/contexts/AuthContext';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCreateContactMutate } from '@/hooks/Contact/useContactHook';
import { ContactCreateDTO } from '@/services/Contact/contact.types';
import { GoBack } from '@/components/GoBack/GoBack';

const ContactContainer = () => {
    const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
    const { user } = useAuthContext();

    const { mutateAsync, isPending } = useCreateContactMutate(() => {
        toast.success("Mensagem enviada com sucesso!");
        setIsSendMessage(true);
    });

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <GoBack path='/' text='Voltar ao cardápio' />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h1 className="text-3xl font-bold  mb-6">Entre em Contato</h1>
                        <p className="text-gray-600 mb-8">
                            Estamos aqui para ajudar! Preencha o formulário abaixo ou use um de nossos canais de contato.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-orange-100 rounded-full">
                                    <Phone className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="font-medium ">Telefone</h3>
                                    <p className="text-primary mt-1">
                                        <a href="tel:+551199999999">
                                            (11) 94486-7163
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-orange-100 rounded-full">
                                    <Mail className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="font-medium ">Email</h3>
                                    <p className="text-primary mt-1">
                                        <a href="mailto:crislaureano01@gmail.com" className="hover:text-orange-500">
                                            crislaureano01@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div>
                        <div className="bg-sidebar rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold  mb-6">Envie sua mensagem</h2>

                            <FormContextProvider
                                defaultValues={contactFormDefaultValues(user ?? null)}
                                validationSchema={contactFormValidationSchema}
                                onSubmit={(values) => mutateAsync(values as ContactCreateDTO)}
                            >
                                <ContactForm isLoading={isPending} isSendMessage={isSendMessage} />
                            </FormContextProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactContainer;