import { ForgotPassword } from './ForgotPassword'
import { FormContextProvider } from '@/contexts/FormContext'
import { forgotPasswordDefaultValues, forgotPasswordValidationSchema } from './ForgotPasswordSchema'
import { useAuthContext } from '@/contexts/AuthContext';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router';

export const ForgotPasswordContainer = () => {
    const navigate = useNavigate();
    const { sendPasswordResetEmailAsync, isLoading } = useAuthContext();

    const onSubmit = (values: FieldValues) => {
        const email = values?.email;
        sendPasswordResetEmailAsync(email, () => navigate('/login'));
    };

    return (
        <FormContextProvider
            defaultValues={forgotPasswordDefaultValues}
            validationSchema={forgotPasswordValidationSchema}
            onSubmit={onSubmit}
            submitting={isLoading}
        >
            <ForgotPassword />
        </FormContextProvider>
    )
}
