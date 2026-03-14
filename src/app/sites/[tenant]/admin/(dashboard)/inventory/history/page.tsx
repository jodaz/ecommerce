'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Loader2, ArrowUpRight, ArrowDownRight, RefreshCcw, ShoppingBag, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getBusinessBySlug } from '@/lib/api/inventory-client';
import { cn } from '@/lib/utils';

interface InventoryLog {
  id: string;
  change_amount: number;
  previous_quantity: number;
  new_quantity: number;
  reason: string;
  created_at: string;
  business_products: { name: string };
  stores: { name: string };
}

export default function AdminStockHistoryPage() {
  const { tenant } = useParams();
  const [logs, setLogs] = useState<InventoryLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      try {
        const business = await getBusinessBySlug(tenant as string);
        if (business) {
          const res = await fetch(`/api/inventory/logs?business_id=${business.id}`);
          if (res.ok) {
            const data = await res.json();
            setLogs(data);
          }
        }
      } catch (error) {
        console.error('Error loading logs:', error);
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, [tenant]);

  const getReasonBadge = (reason: string, amount: number) => {
    const config: Record<string, { label: string; icon: any; color: string }> = {
      restock: { label: 'Abastecimiento', icon: ArrowUpRight, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
      sale: { label: 'Venta', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50 border-blue-100' },
      correction: { label: 'Corrección', icon: RefreshCcw, color: 'text-zinc-600 bg-zinc-50 border-zinc-100' },
      waste: { label: 'Merma', icon: AlertTriangle, color: 'text-red-600 bg-red-50 border-red-100' },
      transfer: { label: 'Transferencia', icon: RefreshCcw, color: 'text-purple-600 bg-purple-50 border-purple-100' },
    };

    const item = config[reason] || { label: reason, icon: RefreshCcw, color: 'text-zinc-600 bg-zinc-50' };
    const Icon = item.icon;

    return (
      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider border rounded-sm", item.color)}>
        <Icon size={10} />
        {item.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-zinc-400 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Cargando Historial...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/inventory" 
          className="p-2 -ml-2 text-zinc-400 hover:text-black transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight uppercase">Auditoría de Stock</h1>
          <p className="text-zinc-500 mt-1 font-medium tracking-wide text-sm">Historial de movimientos y ajustes</p>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Fecha</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Producto</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Sucursal</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Movimiento</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Cambio</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-black">
                      {format(new Date(log.created_at), 'dd MMM yyyy', { locale: es })}
                    </span>
                    <span className="text-[9px] font-bold text-zinc-400 uppercase mt-0.5">
                      {format(new Date(log.created_at), 'HH:mm', { locale: es })}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-black tracking-tight uppercase text-xs">
                    {log.business_products?.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">
                    {log.stores?.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {getReasonBadge(log.reason, log.change_amount)}
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-xs font-black",
                    log.change_amount > 0 ? "text-emerald-600" : "text-red-600"
                  )}>
                    {log.change_amount > 0 ? '+' : ''}{log.change_amount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-400 font-bold">{log.previous_quantity}</span>
                    <span className="text-zinc-300">→</span>
                    <span className="text-xs font-black text-black">{log.new_quantity}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {logs.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">No hay movimientos registrados</p>
          </div>
        )}
      </div>
    </div>
  );
}
