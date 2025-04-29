import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useSidebar } from '../ui/sidebar';

type CustomDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  disableConfirm?: boolean;
  children?: React.ReactNode;
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'full';
};

export function CustomDrawer({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  loading = false,
  disableConfirm = false,
  children,
  size = 'default',
}: CustomDrawerProps) {
  const { isMobile } = useSidebar()

  const sizeClasses = {
    sm: 'w-[300px]',
    default: 'w-[400px]',
    lg: 'w-[600px]',
    xl: 'w-[800px]',
    full: 'w-screen',
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className={isMobile ? sizeClasses['full']: sizeClasses[size]}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        <div>{children}</div>

        {(onConfirm || onCancel) && (
          <SheetFooter className="mt-auto flex justify-end gap-2">
            {onCancel && (
              <Button variant="outline" onClick={onCancel}>
                {cancelText}
              </Button>
            )}
            {onConfirm && (
              <Button onClick={onConfirm} disabled={disableConfirm || loading}>
                {loading ? 'Carregando...' : confirmText}
              </Button>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
