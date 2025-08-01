import { HandleRouterType } from '@/@types/generic.types';
import { Layout } from '@/components/Layout/Layout';
import { NotFound, HomeContainer, OrderContaier } from '@/pages';
import ContactContainer from '@/pages/Contact/ContactContainer';
import { UpInsertFoodContainer } from '@/pages/Food/UpInsertFood/UpInsertFoodContainer';
import { ForgotPasswordContainer } from '@/pages/ForgotPassword/ForgotPasswordContainer';
import { LoginContainer } from '@/pages/Login/LoginContainer';
import { AdminOrdersContainer } from '@/pages/Order/Admin/AdminOrdersContainer';
import { OrderDetailsContainer } from '@/pages/Order/Details/OrderDetailsContainer';
import { PaymentCheckoutContainer } from '@/pages/Payment/PaymentCheckout/PaymentCheckoutContainer';
import { SelectPaymentMethodContainer } from '@/pages/Payment/SelectPaymentMethodContainer';
import { ProfileContainer } from '@/pages/Profile/ProfileContainer';
import { RegisterContainer } from '@/pages/Register/RegisterContainer';
import { Home, Package, Phone, PlusIcon, Settings2 } from 'lucide-react';
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
        element: <SelectPaymentMethodContainer />,
        handle: {
          breadcrumb: 'Pagamento',
          icon: Package,
          showSideMenu: false
        } as HandleRouterType
      },
      {
        path: '/pedidos/:id/pagamento/pix/:paymentId',
        element: <PaymentCheckoutContainer />,
        handle: {
          breadcrumb: 'Pix',
          icon: Package,
          showSideMenu: false
        } as HandleRouterType
      },
      {
        path: '/pedidos/:id/pagamento/card',
        element: <PaymentCheckoutContainer />,
        handle: {
          breadcrumb: 'Cartão de crédito',
          icon: Package,
          showSideMenu: false
        } as HandleRouterType
      },
      {
        path: '/pedidos/gerenciar',
        element: <AdminOrdersContainer />,
        handle: {
          title: "Gerenciar pedidos",
          icon: Settings2,
          showSideMenu: true,
          isMaster: true
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
        element: <ContactContainer />,
        handle: {
          breadcrumb: 'Contato',
          title: "Contato",
          icon: Phone,
          showSideMenu: true
        } as HandleRouterType
      },
      {
        path: '/perfil',
        element: <ProfileContainer />,
        handle: {
          breadcrumb: 'Perfil',
          title: "Perfil",
          icon: Phone,
          showSideMenu: false
        } as HandleRouterType
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
];
