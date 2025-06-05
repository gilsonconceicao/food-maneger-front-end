import { FormContextProvider } from '@/contexts/FormContext';
import Profile from './Profile'
import { profileValidationSchema, profileDefaultValues } from './ProfileSchema';
import { useGetUserQuery, useUpdateUserByIdMutate } from '@/hooks/User/UserHooks';
import { Loading } from '@/components/Loading/Loading';
import { User } from '@/services/User/user.types';
import toast from 'react-hot-toast';
import { FieldValues } from 'react-hook-form';

export const ProfileContainer = () => {

  const { data: userData, isLoading, refetch } = useGetUserQuery();
  const { mutateAsync } = useUpdateUserByIdMutate(() => {
    refetch();
    toast.success("Suas informações foram atualizada com sucesso")
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
      <Profile isLoading={isLoading} />
    </FormContextProvider>
  )
}
