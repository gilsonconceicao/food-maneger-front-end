import { NotFound, HomeContainer, CartContainer, OrderContaier} from '@/pages';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomeContainer />
  },
  {
    path: '/sacola-de-compras',
    element: <CartContainer />,
  },
  {
    path: '/meus-pedidos',
    element: <OrderContaier />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
