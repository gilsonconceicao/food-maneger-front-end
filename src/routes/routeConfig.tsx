import { HandleRouterType } from '@/@types/generic.types';
import { Layout } from '@/components/Layout/Layout';
import { NotFound, HomeContainer, OrderContaier } from '@/pages';
import { UpInsertFoodContainer } from '@/pages/Food/UpInsertFood/UpInsertFoodContainer';
import { ForgotPasswordContainer } from '@/pages/ForgotPassword/ForgotPasswordContainer';
import { LoginContainer } from '@/pages/Login/LoginContainer';
import { OrderDetailsContainer } from '@/pages/Order/Details/OrderDetailsContainer';
import { PaymentContainer } from '@/pages/Payment/PaymentContainer';
import { RegisterContainer } from '@/pages/Register/RegisterContainer';
import { Home, Package, Phone, PlusIcon } from 'lucide-react';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginContainer />,
  },
  {
    path: '/cadastro',
    element: <RegisterContainer />,
  },
  {
    path: '/recuperar-senha',
    element: <ForgotPasswordContainer />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/',
        element: <HomeContainer />,
        handle: {
          breadcrumb: 'Cardápio',
          title: "Cardápio",
          icon: Home,
          showSideMenu: true
        } as HandleRouterType
      },
      {
        path: '/pedidos',
        element: <OrderContaier />,
        handle: {
          breadcrumb: 'Meus pedidos',
          title: "Meus pedidos",
          icon: Package,
          showSideMenu: true
        } as HandleRouterType
      }, 
      {
        path: '/pedidos/:id',
        element: <OrderDetailsContainer />,
        handle: {
          breadcrumb: 'Detalhes',
          title: "Pedido",
          icon: Package,
          showSideMenu: false
        } as HandleRouterType
      }, 
      {
        path: '/pedidos/:id/pagamento',
        element: <PaymentContainer />,
        handle: {
          breadcrumb: 'Pagamento',
          icon: Package,
          showSideMenu: false
        } as HandleRouterType
      }, 
      {
        path: '/adicionar-comida/:id',
        element: <UpInsertFoodContainer />,
        handle: {
          pathDefault: '/adicionar-comida/adicionar',
          breadcrumb: 'Adicionar',
          title: "Adicionar comida",
          icon: PlusIcon,
          showSideMenu: true, 
          isMaster: true
        } as HandleRouterType
      },
      {
        path: '/contato',
        element: <>Contato...</>,
        handle: {
          breadcrumb: 'Contato',
          title: "Contato",
          icon: Phone,
          showSideMenu: true
        } as HandleRouterType
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
];
