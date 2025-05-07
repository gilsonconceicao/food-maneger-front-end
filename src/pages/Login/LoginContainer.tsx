import { FormContextProvider } from "@/contexts/FormContext";
import { Login } from "./Login";
import { loginValidationSchema, loginDefaultValues } from "./loginSchema";
import { FieldValues } from "react-hook-form";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";
import { Drawer } from "@/components/ui/drawer";
import { useNavigate } from "react-router";

export const LoginContainer = () => {
    const [action, setAction] = useState<{ name: string; email?: string } | null>(
        null
    );
    const navigate = useNavigate();
    const { signUserAsync, isLoading } = useAuthContext();

    const loginOnSuccess = () => {
        navigate("/", { replace: true });
    }

    const onSubmit = async (values: FieldValues) => {
        await signUserAsync(values?.email, values?.password, loginOnSuccess);
    };

    // const handleResetPasswordSubmit = async (values: FieldValues) => {
    //     await sendPasswordResetEmailAsync(values?.email,
    //         () => {
    //             onClose();
    //         })
    // };

    const currentEventAction = action?.name;
    const onClose = () => setAction(null);

    return (
        <div className="min-h-screen">
            <FormContextProvider
                defaultValues={loginDefaultValues}
                validationSchema={loginValidationSchema}
                onSubmit={onSubmit}
                submitting={isLoading}
            >
                <Login />
            </FormContextProvider>

            <Drawer
                {...{
                    title: "Recuperar senha",
                    open: currentEventAction === "resetPassword",
                    onClose,
                    anchor: "right",
                    size: "25%",
                    children: (
                        <>Resetar senha</>
                    ),
                }}
            />
        </div>
    );
};
