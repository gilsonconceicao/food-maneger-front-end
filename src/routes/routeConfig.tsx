
import { SidebarTrigger } from '@/components/ui/sidebar';
import { NotFound } from '@/pages/NotFound/NotFound';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <>
      <SidebarTrigger />
    </>
  },
  {
    path: '/about',
    element: <>B</>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
