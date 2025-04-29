import { Layout } from '@/components/Layout/Layout';
import { NotFound, HomeContainer, CartContainer, OrderContaier} from '@/pages';
import { LoginContainer } from '@/pages/Login/LoginContainer';
import { OrderDetailsContainer } from '@/pages/Order/Details/OrderDetailsContainer';
import { RegisterContainer } from '@/pages/Register/RegisterContainer';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginContainer/>,
  },
  {
    path: '/cadastro',
    element: <RegisterContainer />,
  },
  {
    path: '/',
    element: <Layout />, 
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
