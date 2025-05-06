import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className='dark:bg-gray-900 flex flex-col items-center justify-center h-64 w-1/5 text-center mx-auto radius-2 rounded-sm shadow-md text-base/6'> 
      <h1 className='font-bold'>404</h1>
      <p>Página não encontrada</p>
      <Link to="/" className='bg-amber-400 p-3 rounded-sm shadow-2xl mt-3.5'>Voltar para início</Link>
    </div>
  );
};