import { HandleRouterType } from '@/@types/generic.types';
import { Layout } from '@/components/Layout/Layout';
import { NotFound, HomeContainer, CartContainer, OrderContaier } from '@/pages';
import { UpInsertFoodContainer } from '@/pages/Food/UpInsertFood/UpInsertFoodContainer';
import { LoginContainer } from '@/pages/Login/LoginContainer';
import { OrderDetailsContainer } from '@/pages/Order/Details/OrderDetailsContainer';
import { RegisterContainer } from '@/pages/Register/RegisterContainer';
import { Home, Package, PlusIcon, ShoppingCart } from 'lucide-react';
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
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/',
        element: <HomeContainer />,
        handle: {
          breadcrumb: 'Home',
          title: "Início",
          icon: Home,
          enable: true
        } as HandleRouterType
      },
      {
        path: '/sacola-de-compras',
        element: <CartContainer />,
        handle: {
          breadcrumb: 'Sacola de compras',
          title: "Sacola de compras",
          icon: ShoppingCart,
          enable: true
        } as HandleRouterType
      },
      {
        path: '/meus-pedidos',
        element: <OrderContaier />,
        handle: {
          breadcrumb: 'Meus pedidos',
          title: "Meus pedidos",
          icon: Package,
          enable: true
        } as HandleRouterType,
        children: [
          {
            path: ':id',
            element: <OrderDetailsContainer />,
            handle: { breadcrumb: 'Detalhes' },
          }
        ]
      }, 
      {
        path: '/adicionar-comida/:id',
        
        element: <UpInsertFoodContainer />,
        handle: {
          pathDefault: '/adicionar-comida/adicionar',
          breadcrumb: 'Adicionar',
          title: "Adicionar comida",
          icon: PlusIcon,
          enable: true, 
          isMaster: true
        } as HandleRouterType
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
];
