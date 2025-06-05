import { Phone, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FormContextProvider } from '@/contexts/FormContext';
import { ContactForm } from './ContactForm';
import { contactFormDefaultValues, contactFormValidationSchema } from './ContactFormSchema';

const ContactContainer = () => {
    return (
        <div className="min-h-screen">
            <div className=" shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Link to="/" className="inline-flex items-center gap-2 ">
                        <ArrowLeft className="w-5 h-5" />
                        Voltar ao cardápio
                    </Link>
                </div>
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
                                    <p className="text-gray-600 mt-1">
                                        <a href="tel:+551199999999" className="hover:text-orange-500">
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
                                    <p className="text-gray-600 mt-1">
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
                                defaultValues={contactFormDefaultValues}
                                validationSchema={contactFormValidationSchema}
                                onSubmit={() => { } }
                            >
                                <ContactForm isLoading={false}/>
                            </FormContextProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactContainer;