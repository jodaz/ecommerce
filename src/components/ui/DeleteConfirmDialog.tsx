'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircleIcon, XIcon } from '@/components/core/icons';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Eliminar',
  cancelLabel = 'Cancelar',
  isLoading = false
}: DeleteConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-md shadow-2xl relative z-20 border border-zinc-200 p-8 rounded-none text-center"
          >
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircleIcon className="w-8 h-8" />
            </div>
            
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 mb-2 uppercase">
              {title}
            </h2>
            <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-6 py-3 text-xs font-bold uppercase tracking-widest border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-black transition-colors disabled:opacity-50"
              >
                {cancelLabel}
              </button>
              <button 
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 px-6 py-3 text-xs font-bold uppercase tracking-widest bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-200 disabled:opacity-50"
              >
                {isLoading ? 'Confirmando...' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
