import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  open: boolean;
}

export function LoadingOverlay({ open }: LoadingOverlayProps) {
  if (!open) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm'
      )}
    >
      <Loader2 className="h-10 w-10 animate-spin text-white" />
    </div>
  );
}
