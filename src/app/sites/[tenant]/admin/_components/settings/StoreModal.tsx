import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from '@/components/core/icons';

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingStore: any;
  storeForm: {
    name: string;
    address: string;
    phone: string;
    is_active: boolean;
    is_main: boolean;
  };
  onFormChange: (data: any) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function StoreModal({
  isOpen,
  onClose,
  editingStore,
  storeForm,
  onFormChange,
  onSave,
}: StoreModalProps) {
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
                {editingStore ? 'Editar Sucursal' : 'Nueva Sucursal'}
              </h2>
              <button type="button" onClick={onClose} className="text-zinc-400 hover:text-black transition-colors p-1 cursor-pointer">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={onSave} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Nombre de la sucursal
                </label>
                <input 
                  type="text"
                  value={storeForm.name}
                  onChange={e => onFormChange({ ...storeForm, name: e.target.value })}
                  placeholder="Ej: Sede Principal Chacao"
                  className="w-full h-11 px-4 border border-zinc-200 focus:outline-none focus:border-black transition-colors rounded-none font-medium"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Dirección
                </label>
                <textarea 
                  value={storeForm.address}
                  onChange={e => onFormChange({ ...storeForm, address: e.target.value })}
                  placeholder="Calle, Edificio, Local, Ciudad..."
                  className="w-full p-4 border border-zinc-200 focus:outline-none focus:border-black transition-colors rounded-none resize-none font-medium text-sm"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Teléfono de contacto
                </label>
                <input 
                  type="text"
                  value={storeForm.phone}
                  onChange={e => onFormChange({ ...storeForm, phone: e.target.value })}
                  placeholder="Ej: +58 412 1234567"
                  className="w-full h-11 px-4 border border-zinc-200 focus:outline-none focus:border-black transition-colors rounded-none font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    id="isStoreActive"
                    checked={storeForm.is_active}
                    onChange={e => onFormChange({ ...storeForm, is_active: e.target.checked })}
                    className="w-4 h-4 accent-black rounded-none border-zinc-300 cursor-pointer"
                  />
                  <label htmlFor="isStoreActive" className="text-xs font-bold uppercase tracking-widest text-zinc-800 select-none cursor-pointer">
                    Sucursal Activa
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    id="isMainStore"
                    checked={storeForm.is_main}
                    onChange={e => onFormChange({ ...storeForm, is_main: e.target.checked })}
                    disabled={editingStore?.is_main} // No se puede desmarcar si ya es principal (deben cambiar otra)
                    className="w-4 h-4 accent-black rounded-none border-zinc-300 cursor-pointer disabled:opacity-50"
                  />
                  <label 
                    htmlFor="isMainStore" 
                    className={`text-xs font-bold uppercase tracking-widest text-zinc-800 select-none cursor-pointer ${editingStore?.is_main ? 'text-zinc-400' : ''}`}
                  >
                    Sede Principal
                  </label>
                </div>
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
                  {editingStore ? 'Guardar Cambios' : 'Agregar Sucursal'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
