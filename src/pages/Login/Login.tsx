import { textFieldIconSx } from "@/@types/generic.types";
import { TextFormField } from "@/components/FormFields/TextFormField";
import { TextPasswordFormField } from "@/components/FormFields/TextPasswordFormField";
import { useFormContext } from "@/contexts/FormContext";
import { ArrowRight, Lock, LogIn, Mail } from "lucide-react";
import { Link } from "react-router";

export const Login = () => {
    const { submitting } = useFormContext();

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-900">
            <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md animate-fade-in">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-orange-500/10 p-4 rounded-full mb-4">
                        <LogIn className="w-8 h-8 text-orange-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Bem-vindo(a) de volta</h2>
                    <p className="text-gray-400 text-sm mt-2 text-center">
                        Entre com suas credenciais para acessar sua conta
                    </p>
                </div>

                <div className="space-y-5">
                    <div>
                        <TextFormField
                            name="email"
                            label="Email"
                            placeholder="Digite seu email"
                            icon={<Mail className={textFieldIconSx} />}
                        />
                    </div>
                    <div>
                        <TextPasswordFormField
                            name="password"
                            label="Senha"
                            placeholder="* * * * * * * *"
                            icon={<Lock className={textFieldIconSx} />}
                        />
                    </div>

                    <div className="flex items-center justify-end text-sm">
                        <Link to="/recuperar-senha" className="text-orange-400 hover:text-orange-500 font-medium">
                            Esqueceu a senha?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <>
                                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                Entrando...
                            </>
                        ) : (
                            <>
                                Acessar
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-400">Ainda não tem uma conta?</p>
                    <Link
                        to="/cadastro"
                        className="text-orange-400 hover:text-orange-500 text-sm font-medium mt-1 inline-flex items-center gap-1"
                    >
                        Criar conta agora
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
