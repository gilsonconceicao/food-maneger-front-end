import { TextFormField } from "@/components/FormFields/TextFormField";
import { TextPasswordFormField } from "@/components/FormFields/TextPasswordFormField";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/contexts/FormContext";
import { Link } from "react-router";

export const Register = () => {
    const {subbmiting} = useFormContext(); 

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Seja bem-vindo(a)
                </h2>

                <div className="space-y-5">
                    <TextFormField
                        name="displayName"
                        label="Nome"
                        placeholder="Digite seu nome"
                    />
                    <TextFormField
                        name="email"
                        label="Email"
                        placeholder="Digite seu email"
                    />
                    <TextFormField
                        name="phoneNumber"
                        label="Telefone"
                        placeholder="Digite seu telefone"
                        mask="phone"
                    />
                    <TextPasswordFormField
                        name="password"
                        label="Senha"
                        placeholder="* * * * * * * *"
                    />

                    <Button
                        variant="default"
                        type="submit"
                        disabled={subbmiting}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all cursor-pointer"
                    >
                        Cadastrar
                    </Button>
                </div>

                <div className="mt-6 text-center">
                    <Link
                        to="/login"
                        className="text-orange-400 hover:text-orange-500 text-sm font-medium underline"
                    >
                        Já tenho cadastro
                    </Link>
                </div>
            </div>
        </div>
    );
};
