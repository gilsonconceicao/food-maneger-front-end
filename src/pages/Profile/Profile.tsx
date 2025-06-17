import React from 'react';
import { User, Save, Loader2, MailIcon, PhoneIcon, LocateIcon } from 'lucide-react';
import { GoBack } from '@/components/GoBack/GoBack';
import { TextFormField } from '@/components/FormFields/TextFormField';
import { SelectFormField } from '@/components/FormFields/SelectFormField';
import { states } from '@/constants/generic';

type ProfileProps = {
  isLoading: boolean;
  redirectTo: string;
}

const Profile: React.FC<ProfileProps> = ({ isLoading, redirectTo }) => {
  return (
    <div className="space-y-4 max-w-4xl mx-auto p-4">
      <GoBack path={redirectTo ?? "/"} />

      <div className="bg-sidebar space-y-1 rounded-lg shadow-sm overflow-hidden">
        <div className="space-y-2 rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-100 rounded-full">
              <User className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold ">Meu Perfil</h1>
              <p className='text-gray-500'>Atualize suas informações pessoais</p>
            </div>
          </div>

          <h2 className='scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0'>Informações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextFormField
              label='Nome'
              name='name'
              icon={<User />}
            />

            <TextFormField
              label='Email'
              name='email'
              disabled
              icon={<MailIcon />}
            />

            <TextFormField
              label='Número de telefone'
              name='phoneNumber'
              mask='phone'
              icon={<PhoneIcon />}
            />
          </div>
          <h2 className='scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mt-10'>Endereço</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            <TextFormField
              label='CEP'
              name='address.zipCode'
              mask='zipCode'
              icon={<LocateIcon />}
            />
            <TextFormField
              label='Rua'
              name='address.street'
            />
            <TextFormField
              label='Cidade'
              name='address.city'
            />
            <SelectFormField
              label='Estádo '
              name='address.state'
              options={states}
            />
            <TextFormField
              label='Número'
              name='address.number'
            />
            <TextFormField
              label='Complemento'
              name='address.complement'
            />
          </div>
          <div className="border-t pt-4 mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-orange-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salvar alterações
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;