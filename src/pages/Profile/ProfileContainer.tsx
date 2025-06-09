import { FormContextProvider } from '@/contexts/FormContext';
import Profile from './Profile'
import { profileValidationSchema, profileDefaultValues } from './ProfileSchema';
import { useGetUserQuery, useUpdateUserByIdMutate } from '@/hooks/User/UserHooks';
import { Loading } from '@/components/Loading/Loading';
import { User } from '@/services/User/user.types';
import toast from 'react-hot-toast';
import { FieldValues } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

export const ProfileContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pedidoId = searchParams.get("pedidoId");
  const redirectTo = `/pedidos/${pedidoId ?? null}`;
  
  const { data: userData, isLoading, refetch } = useGetUserQuery();
  const { mutateAsync } = useUpdateUserByIdMutate(() => {
    refetch();
    toast.success("Suas informações foram atualizada com sucesso"); 
    
    if (pedidoId !== null && pedidoId !== undefined) {
      navigate(redirectTo); 
    }
  });
  
  const handleOnSubmit = async (values: FieldValues) => {
    await mutateAsync(values as User);
  }

  if (isLoading) return <Loading />;
  return (
    <FormContextProvider
      defaultValues={userData ?? profileDefaultValues}
      validationSchema={profileValidationSchema}
      onSubmit={handleOnSubmit}
      submitting={isLoading}
    >
      <Profile isLoading={isLoading} redirectTo={redirectTo}/>
    </FormContextProvider>
  )
}
