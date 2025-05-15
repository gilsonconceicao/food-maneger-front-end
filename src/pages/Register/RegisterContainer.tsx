import { FormContextProvider } from "@/contexts/FormContext";
import { Register } from "./Register";
import { registerValidationSchema, registerDefaultValues } from "./registerSchema";
import { FieldValues } from "react-hook-form";
import { CreateUserFirebaseType, useAuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";

export const RegisterContainer = () => {
  const { createUserAsync, isLoading } = useAuthContext();
  const navigate = useNavigate();

  const createUserOnSuccess = () => {
    navigate("/", { replace: true, });
    window.location.reload();
  }

  const onSubmit = async (values: FieldValues) => {
    await createUserAsync(values as CreateUserFirebaseType, createUserOnSuccess);
  };

  return (
    <div className="min-h-screen">
      <FormContextProvider
        defaultValues={registerDefaultValues}
        validationSchema={registerValidationSchema}
        onSubmit={onSubmit}
        submitting={isLoading}
      >
        <Register />
      </FormContextProvider>
    </div>
  );
};
