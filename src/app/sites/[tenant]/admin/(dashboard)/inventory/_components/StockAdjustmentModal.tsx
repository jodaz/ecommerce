'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Plus, Minus, History, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface StoreStock {
  store_id: string;
  store_name: string;
  is_main: boolean;
  quantity: number;
}

interface ProductInventory {
  id: string;
  name: string;
  image_url: string | null;
  inventory: StoreStock[];
}

interface StockAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: { id: string; name: string } | null;
  businessId: string;
}

export function StockAdjustmentModal({ isOpen, onClose, product, businessId }: StockAdjustmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inventory, setInventory] = useState<StoreStock[]>([]);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [adjustment, setAdjustment] = useState<number>(0);
  const [reason, setReason] = useState<string>('restock');
  const [success, setSuccess] = useState(false);

  const reasons = [
    { value: 'restock', label: 'Abastecimiento' },
    { value: 'correction', label: 'Corrección' },
    { value: 'waste', label: 'Merma / Dañado' },
    { value: 'transfer', label: 'Transferencia' },
  ];

  const loadInventory = useCallback(async () => {
    if (!product) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/inventory?business_id=${businessId}&product_id=${product.id}`);
      if (res.ok) {
        const data: ProductInventory[] = await res.json();
        if (data.length > 0) {
          setInventory(data[0].inventory);
          // Auto-select main store or first store
          const main = data[0].inventory.find(s => s.is_main);
          setSelectedStore(main?.store_id || data[0].inventory[0]?.store_id || null);
        }
      }
    } catch (error) {
      toast.error('Error al cargar inventario por sucursal');
    } finally {
      setLoading(false);
    }
  }, [product, businessId]);

  useEffect(() => {
    if (isOpen && product) {
      loadInventory();
    } else {
      setAdjustment(0);
      setReason('restock');
      setSuccess(false);
    }
  }, [isOpen, product, loadInventory]);

  async function handleAdjust() {
    if (!product || !selectedStore || adjustment === 0) return;
    
    setSubmitting(true);
    try {
      const res = await fetch('/api/inventory/adjust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: businessId,
          store_id: selectedStore,
          product_id: product.id,
          change_amount: adjustment,
          reason,
        }),
      });

      if (res.ok) {
        toast.success('Inventario actualizado');
        setSuccess(true);
        loadInventory();
        setTimeout(() => {
          setSuccess(false);
          setAdjustment(0);
        }, 2000);
      } else {
        const err = await res.json();
        toast.error(err.error || 'Error al actualizar inventario');
      }
    } catch (error) {
      toast.error('Error de red');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-2xl overflow-hidden shadow-2xl border border-zinc-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-zinc-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                  <History size={20} />
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-widest leading-tight">Gestionar Stock</h2>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">{product?.name}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-200 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                  <Loader2 className="animate-spin text-zinc-300" size={32} />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Consultando sucursales...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Left: Current Stock per Store */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                      Existencias actuales
                    </h3>
                    <div className="space-y-2">
                      {inventory.map((s) => (
                        <button
                          key={s.store_id}
                          onClick={() => setSelectedStore(s.store_id)}
                          className={cn(
                            "w-full flex items-center justify-between p-4 border-2 transition-all text-left",
                            selectedStore === s.store_id 
                              ? "border-black bg-zinc-50" 
                              : "border-zinc-100 hover:border-zinc-200"
                          )}
                        >
                          <div>
                            <p className="text-xs font-black uppercase tracking-tight">{s.store_name}</p>
                            {s.is_main && (
                              <span className="text-[8px] font-black uppercase bg-emerald-100 text-emerald-700 px-1.5 py-0.5 mt-1 inline-block">
                                Principal
                              </span>
                            )}
                          </div>
                          <span className={cn(
                            "text-lg font-black",
                            s.quantity <= 5 ? "text-red-600" : "text-black"
                          )}>
                            {s.quantity}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Adjustment Form */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                      Realizar Ajuste
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Quantity Input */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Cantidad (+ o -)</label>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setAdjustment(prev => prev - 1)}
                            className="w-12 h-12 border-2 border-zinc-200 flex items-center justify-center hover:border-black transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <input 
                            type="number"
                            value={adjustment}
                            onChange={(e) => setAdjustment(parseInt(e.target.value) || 0)}
                            className="flex-1 h-12 text-center font-black text-xl border-2 border-zinc-200 outline-none focus:border-black"
                          />
                          <button 
                            onClick={() => setAdjustment(prev => prev + 1)}
                            className="w-12 h-12 border-2 border-zinc-200 flex items-center justify-center hover:border-black transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Reason Select */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Motivo del movimiento</label>
                        <select
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="w-full h-12 px-4 border-2 border-zinc-200 outline-none focus:border-black font-bold text-xs uppercase"
                        >
                          {reasons.map(r => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={handleAdjust}
                          disabled={submitting || adjustment === 0 || !selectedStore || success}
                          className={cn(
                            "w-full h-14 flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] transition-all",
                            success 
                              ? "bg-emerald-500 text-white" 
                              : "bg-black text-white hover:bg-zinc-800 active:scale-95 disabled:bg-zinc-200 disabled:text-zinc-400"
                          )}
                        >
                          {submitting ? (
                            <Loader2 className="animate-spin" size={20} />
                          ) : success ? (
                            <>
                              <CheckCircle2 size={20} />
                              Completado
                            </>
                          ) : (
                            'Confirmar Ajuste'
                          )}
                        </button>
                      </div>

                      {adjustment < 0 && (
                        <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3">
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          <p className="text-[9px] font-bold uppercase tracking-tight leading-normal">
                            Estás reduciendo el stock. Asegúrate de que la cantidad física coincida con este ajuste.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer info */}
            <div className="px-8 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-between items-center">
               <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">
                 Los movimientos quedan registrados en el historial de auditoría
               </p>
               <button 
                 onClick={onClose}
                 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-black transition-colors"
               >
                 Cerrar
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
