import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from '@/components/core/icons';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingPayment: any;
  paymentForm: {
    type: string;
    label: string;
    details: string;
    is_active: boolean;
  };
  onFormChange: (data: any) => void;
  onSave: (e: React.FormEvent) => void;
  PAYMENT_ICONS: Record<string, any>;
}

export default function PaymentMethodModal({
  isOpen,
  onClose,
  editingPayment,
  paymentForm,
  onFormChange,
  onSave,
  PAYMENT_ICONS
}: PaymentMethodModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-lg shadow-2xl relative z-10 border border-zinc-200 rounded-none overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-zinc-100">
              <h2 className="text-lg font-bold tracking-tight uppercase">
                {editingPayment ? 'Editar Método de Pago' : 'Nuevo Método de Pago'}
              </h2>
              <button type="button" onClick={onClose} className="text-zinc-400 hover:text-black transition-colors p-1 cursor-pointer">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={onSave} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Tipo de Pago
                </label>
                <select 
                  value={paymentForm.type}
                  onChange={e => onFormChange({ ...paymentForm, type: e.target.value })}
                  className="w-full h-11 px-4 border border-zinc-200 focus:outline-none focus:border-black transition-colors rounded-none appearance-none bg-white font-medium"
                  required
                >
                  {Object.keys(PAYMENT_ICONS).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Etiqueta (Opcional)
                </label>
                <p className="text-[10px] text-zinc-400 italic mb-1">Un nombre descriptivo, ej: "Zelle Principal"</p>
                <input 
                  type="text"
                  value={paymentForm.label}
                  onChange={e => onFormChange({ ...paymentForm, label: e.target.value })}
                  placeholder="Ej: Cuenta Zelle Empresa"
                  className="w-full h-11 px-4 border border-zinc-200 focus:outline-none focus:border-black transition-colors rounded-none font-medium"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Detalles e Instrucciones
                </label>
                <p className="text-[10px] text-zinc-400 italic mb-1">Correo de Zelle, número de Pago Móvil, etc.</p>
                <textarea 
                  value={paymentForm.details}
                  onChange={e => onFormChange({ ...paymentForm, details: e.target.value })}
                  placeholder="Detalles para que el cliente realice el pago"
                  className="w-full p-4 border border-zinc-200 focus:outline-none focus:border-black transition-colors rounded-none resize-none font-medium text-sm"
                  rows={4}
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input 
                  type="checkbox"
                  id="isActive"
                  checked={paymentForm.is_active}
                  onChange={e => onFormChange({ ...paymentForm, is_active: e.target.checked })}
                  className="w-4 h-4 accent-black rounded-none border-zinc-300 cursor-pointer"
                />
                <label htmlFor="isActive" className="text-xs font-bold uppercase tracking-widest text-zinc-800 select-none cursor-pointer">
                  Método de pago activo
                </label>
              </div>

              <div className="pt-6 border-t border-zinc-100 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-black transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-8 py-3 text-[10px] font-bold uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors"
                >
                  {editingPayment ? 'Guardar Cambios' : 'Agregar Método'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
