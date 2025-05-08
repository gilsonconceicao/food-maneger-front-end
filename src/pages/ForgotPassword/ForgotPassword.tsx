import { textFieldIconSx } from "@/@types/generic.types"
import { TextFormField } from "@/components/FormFields/TextFormField"
import { Button } from "@/components/ui/button"
import { useFormContext } from "@/contexts/FormContext"
import { ArrowBigLeft, KeyRound, Lock, Mail } from "lucide-react"
import { useNavigate } from "react-router"

export const ForgotPassword = () => {
    const { submitting } = useFormContext();
    const nav = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-900">
            <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md animate-fade-in">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-orange-500/10 p-4 rounded-full mb-4">
                        <Lock className="w-8 h-8 text-orange-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Encontre sua conta</h2>
                    <p className="text-gray-400 text-sm mt-2 text-center">
                        Informe o seu e-mail para recuperação de senha
                    </p>
                </div>

                <div className="space-y-10">
                    <div>
                        <TextFormField
                            name="email"
                            label="Email"
                            placeholder="Digite seu email"
                            icon={<Mail className={textFieldIconSx} />}
                        />
                    </div>

                    <div className="grid grid-cols-2 items-center gap-2">
                        <Button variant='outline' type="button" onClick={() => nav('/login')} className="w-full">
                            <>
                                <ArrowBigLeft className="w-4 h-4" />
                                Voltar
                            </>
                        </Button>
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            {submitting ? (
                                <>
                                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    Acessar
                                    <KeyRound className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
