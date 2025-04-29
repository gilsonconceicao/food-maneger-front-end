import { useRoutes } from 'react-router-dom';
import { routes } from './routeConfig';

export const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};
