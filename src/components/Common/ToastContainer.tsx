import React from 'react';
import { useCart } from '../../context/CartContext';
import { Sparkles, CheckCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-surface-text text-surface-cream dark:bg-dark-text dark:text-surface-text p-3.5 rounded-xl shadow-2xl border border-brand-primary/40 flex items-center justify-between gap-3 text-xs sm:text-sm animate-slideUp transition-all duration-300"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'gold' ? (
              <Sparkles className="w-4 h-4 text-amber-400 dark:text-amber-600 shrink-0" />
            ) : toast.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-brand-primary-light dark:text-brand-primary shrink-0" />
            )}
            <span className="font-medium leading-snug">{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 opacity-60 hover:opacity-100 transition shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
