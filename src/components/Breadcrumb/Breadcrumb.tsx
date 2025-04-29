import { Link, useLocation, matchRoutes } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { routes } from '@/routes/routeConfig';

export function Breadcrumbs() {
  const location = useLocation();
  const matches = matchRoutes(routes, location);

  if (!matches) return null;

  return (
    <nav className="flex items-center text-sm text-muted-foreground space-x-1">
      {matches.map((match, index) => {
        const route = match.route;
        const isLast = index === matches.length - 1;
        const path = matches
          .slice(1, index + 1)
          .map((m) => m.pathnameBase)
          .join('');

        // label pode ser customizado via route handle ou fallback para pathname
        const label =
          route.handle?.breadcrumb ??
          route.path?.replace('/:id', 'Detalhes') ??
          'Início';

        return (
          <span key={match.pathnameBase} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
            {isLast ? (
              <span className="font-semibold">{label}</span>
            ) : (
              <Link
                to={path || '/'}
                className={cn('hover:underline', index === 0 && 'text-primary')}
              >
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
