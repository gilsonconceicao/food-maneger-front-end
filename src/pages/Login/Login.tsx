import { TextFormField } from "@/components/FormFields/TextFormField";
import { TextPasswordFormField } from "@/components/FormFields/TextPasswordFormField";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/contexts/FormContext";
import { Link } from "react-router";

export const Login = () => {
        const {subbmiting} = useFormContext(); 
    
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Bem-vindo(a) de volta
                </h2>

                <div className="space-y-5">
                    <TextFormField
                        name="email"
                        label="Email"
                        placeholder="Digite seu email"
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
                        className="w-full bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all cursor-pointer"
                    >
                        Acessar
                    </Button>
                </div>

                <div className="mt-6 text-center">
                    <Link
                        to="/cadastro"
                        className="text-orange-400 hover:text-orange-500 text-sm font-medium underline"
                    >
                        Ainda não tenho cadastro
                    </Link>
                </div>
            </div>
        </div>
    );
};
