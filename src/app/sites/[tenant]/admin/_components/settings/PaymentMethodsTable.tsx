import { Loader2 } from 'lucide-react';
import { PencilIcon, Trash2Icon, BankIcon } from '@/components/core/icons';
import { PaymentMethodType } from '@/stores/adminStore';

interface PaymentMethod {
  id: string;
  type: string;
  label: string;
  details: string;
  is_active: boolean;
}

interface PaymentMethodsTableProps {
  paymentMethods: PaymentMethod[];
  loadingPayments: boolean;
  onAddMethod: () => void;
  onEditMethod: (method: PaymentMethod) => void;
  onDeleteMethod: (id: string, label: string) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  PAYMENT_ICONS: Record<PaymentMethodType, any>;
  PAYMENT_COLORS: Record<PaymentMethodType, string>;
}

export default function PaymentMethodsTable({
  paymentMethods,
  loadingPayments,
  onAddMethod,
  onEditMethod,
  onDeleteMethod,
  onToggleStatus,
  PAYMENT_ICONS,
  PAYMENT_COLORS
}: PaymentMethodsTableProps) {
  return (
    <div className="space-y-6 bg-white border border-zinc-200 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-200">
        <h2 className="text-lg font-bold tracking-tight">Métodos de Pago</h2>
        <button 
          type="button"
          onClick={onAddMethod}
          className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
        >
          Nuevo Método
        </button>
      </div>
      
      <div className="overflow-x-auto">
        {loadingPayments ? (
           <div className="py-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50 uppercase tracking-widest text-xs font-semibold text-zinc-500">
              <tr>
                <th className="px-6 py-4 border-b border-zinc-200">Tipo</th>
                <th className="px-6 py-4 border-b border-zinc-200">Etiqueta</th>
                <th className="px-6 py-4 border-b border-zinc-200">Detalles</th>
                <th className="px-6 py-4 border-b border-zinc-200">Estado</th>
                <th className="px-6 py-4 border-b border-zinc-200 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {paymentMethods.map((pm) => {
                const pmType = pm.type as PaymentMethodType;
                const Icon = PAYMENT_ICONS[pmType] || BankIcon;
                return (
                  <tr key={pm.id} className="hover:bg-zinc-50 transition-colors font-medium">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${PAYMENT_COLORS[pmType]}`} />
                        <span className="font-bold">{pm.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-600">{pm.label}</td>
                    <td className="px-6 py-4 text-zinc-600 max-w-[200px] truncate" title={pm.details}>{pm.details}</td>
                    <td className="px-6 py-4">
                      <button 
                        type="button"
                        onClick={() => onToggleStatus(pm.id, pm.is_active)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-widest border transition-colors ${
                          pm.is_active 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-zinc-100 text-zinc-500 border-zinc-200'
                        }`}
                      >
                        {pm.is_active ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        type="button"
                        onClick={() => onEditMethod(pm)} 
                        className="text-zinc-400 hover:text-black transition-colors" 
                        title="Editar"
                      >
                        <PencilIcon className="w-4 h-4 inline-block" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => onDeleteMethod(pm.id, pm.label)} 
                        className="text-zinc-400 hover:text-red-600 transition-colors" 
                        title="Eliminar"
                      >
                        <Trash2Icon className="w-4 h-4 inline-block" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {paymentMethods.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500 uppercase text-xs tracking-widest font-bold">No hay métodos de pago registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
