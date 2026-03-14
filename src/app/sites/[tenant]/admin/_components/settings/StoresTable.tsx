import { Loader2 } from 'lucide-react';
import { PencilIcon, Trash2Icon, MapPinIcon } from '@/components/core/icons';

interface Store {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  is_main: boolean;
  is_active: boolean;
}

interface StoresTableProps {
  stores: Store[];
  loadingStores: boolean;
  onAddStore: () => void;
  onEditStore: (store: Store) => void;
  onDeleteStore: (id: string, name: string) => void;
  userRole: string | undefined;
}

export default function StoresTable({
  stores,
  loadingStores,
  onAddStore,
  onEditStore,
  onDeleteStore,
  userRole
}: StoresTableProps) {
  const isOwner = userRole === 'owner';

  return (
    <div className="space-y-6 bg-white border border-zinc-200 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-200">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Sucursales</h2>
          <p className="text-sm text-zinc-500 mt-1 font-medium">Ubicaciones físicas y sedes de tu negocio</p>
        </div>
        {isOwner && (
          <button 
            type="button"
            onClick={onAddStore}
            className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
          >
            Nueva Sucursal
          </button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        {loadingStores ? (
           <div className="py-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50 uppercase tracking-widest text-xs font-semibold text-zinc-500">
              <tr>
                <th className="px-6 py-4 border-b border-zinc-200">Nombre</th>
                <th className="px-6 py-4 border-b border-zinc-200">Dirección</th>
                <th className="px-6 py-4 border-b border-zinc-200">Teléfono</th>
                <th className="px-6 py-4 border-b border-zinc-200">Principal</th>
                <th className="px-6 py-4 border-b border-zinc-200">Estado</th>
                <th className="px-6 py-4 border-b border-zinc-200 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {stores.map((store) => (
                <tr key={store.id} className="hover:bg-zinc-50 transition-colors font-medium">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-zinc-400" />
                      <span className="font-bold">{store.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 max-w-[250px] truncate" title={store.address || ''}>
                    {store.address || 'Sin dirección'}
                  </td>
                  <td className="px-6 py-4 text-zinc-600">{store.phone || '-'}</td>
                  <td className="px-6 py-4">
                    {store.is_main && (
                      <span className="inline-flex items-center px-2 py-0.5 bg-black text-white font-bold text-[9px] tracking-widest uppercase">
                        Principal
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-widest border ${
                      store.is_active 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-zinc-100 text-zinc-500 border-zinc-200'
                    }`}>
                      {store.is_active ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button 
                      type="button"
                      onClick={() => onEditStore(store)} 
                      className="text-zinc-400 hover:text-black transition-colors" 
                      title="Editar"
                    >
                      <PencilIcon className="w-4 h-4 inline-block" />
                    </button>
                    {!store.is_main && isOwner && (
                      <button 
                        type="button"
                        onClick={() => onDeleteStore(store.id, store.name)} 
                        className="text-zinc-400 hover:text-red-600 transition-colors" 
                        title="Eliminar"
                      >
                        <Trash2Icon className="w-4 h-4 inline-block" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {stores.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-zinc-500 uppercase text-xs tracking-widest font-bold">No hay sucursales registradas</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
