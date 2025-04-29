import { Layout } from '@/components/Layout/Layout';
import { NotFound, HomeContainer, CartContainer, OrderContaier} from '@/pages';
import { OrderDetailsContainer } from '@/pages/Order/Details/OrderDetailsContainer';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <>Login page </>,
  },
  {
    path: '/cadastro',
    element: <>Registre-se</>,
  },
  {
    path: '/',
    element: <Layout />, 
    handle: { breadcrumb: 'Início' },
    children: [
      { 
        index: true, 
        element: <HomeContainer /> 
      },
      { 
        path: '/sacola-de-compras', 
        element: <CartContainer />, 
        handle: { breadcrumb: 'Sacola de compras' },
      },
      { 
        path: '/meus-pedidos', 
        element: <OrderContaier />, 
        handle: { breadcrumb: 'Meus Pedidos' },
        children: [
          {
            path: ':id',
            element: <OrderDetailsContainer />,
            handle: { breadcrumb: 'Detalhes' },
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
];
