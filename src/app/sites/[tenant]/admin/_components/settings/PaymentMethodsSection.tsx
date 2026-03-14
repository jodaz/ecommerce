'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  PayPalIcon, 
  ZelleIcon, 
  BinanceIcon, 
  SmartphoneIcon, 
  BankIcon 
} from '@/components/core/icons';
import { getPaymentMethods, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } from '@/lib/api/inventory-client';
import { PaymentMethodType } from '@/stores/adminStore';
import PaymentMethodsTable from './PaymentMethodsTable';
import PaymentMethodModal from './PaymentMethodModal';
import DeleteConfirmDialog from '@/components/ui/DeleteConfirmDialog';

interface PaymentMethodsSectionProps {
  businessId: string;
}

const PAYMENT_ICONS: Record<PaymentMethodType, any> = {
  'PayPal': PayPalIcon,
  'Zelle': ZelleIcon,
  'Binance': BinanceIcon,
  'Pago Móvil': SmartphoneIcon,
  'Transferencia Bancaria': BankIcon,
};

const PAYMENT_COLORS: Record<PaymentMethodType, string> = {
  'PayPal': 'text-[#003087]',
  'Zelle': 'text-[#6d1ed1]',
  'Binance': 'text-[#F3BA2F]',
  'Pago Móvil': 'text-emerald-600',
  'Transferencia Bancaria': 'text-zinc-700',
};

export default function PaymentMethodsSection({ businessId }: PaymentMethodsSectionProps) {
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form, setForm] = useState({ type: 'Zelle', label: '', details: '', is_active: true });
  
  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string, label: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getPaymentMethods(businessId);
      setPaymentMethods(data || []);
    } catch (error) {
      toast.error('Error al cargar los métodos de pago');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (businessId) loadData();
  }, [businessId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const updated = await updatePaymentMethod(editingItem.id, form);
        setPaymentMethods(prev => prev.map(p => p.id === editingItem.id ? updated : p));
        toast.success('Método actualizado', { className: "bg-black text-white rounded-none border border-zinc-800 font-bold uppercase tracking-widest text-[10px]" });
      } else {
        const created = await createPaymentMethod({ ...form, business_id: businessId });
        setPaymentMethods(prev => [created, ...prev]);
        toast.success('Método agregado', { className: "bg-black text-white rounded-none border border-zinc-800 font-bold uppercase tracking-widest text-[10px]" });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error al guardar el método de pago');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const updated = await updatePaymentMethod(id, { is_active: !currentStatus });
      setPaymentMethods(prev => prev.map(p => p.id === id ? updated : p));
    } catch (error) {
      toast.error('Error al cambiar el estado');
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      setIsDeleting(true);
      await deletePaymentMethod(itemToDelete.id);
      setPaymentMethods(prev => prev.filter(p => p.id !== itemToDelete.id));
      toast.success('Método eliminado', { className: 'bg-black text-white rounded-none border border-zinc-800 font-bold uppercase tracking-widest text-[10px]' });
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      toast.error('Error al eliminar');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <PaymentMethodsTable 
        paymentMethods={paymentMethods}
        loadingPayments={loading}
        onAddMethod={() => {
          setEditingItem(null);
          setForm({ type: 'Zelle', label: '', details: '', is_active: true });
          setIsModalOpen(true);
        }}
        onEditMethod={(pm) => {
          setEditingItem(pm);
          setForm({
            type: pm.type,
            label: pm.label,
            details: pm.details,
            is_active: pm.is_active
          });
          setIsModalOpen(true);
        }}
        onDeleteMethod={(id, label) => {
          setItemToDelete({ id, label });
          setIsDeleteModalOpen(true);
        }}
        onToggleStatus={handleToggleStatus}
        PAYMENT_ICONS={PAYMENT_ICONS}
        PAYMENT_COLORS={PAYMENT_COLORS}
      />

      <PaymentMethodModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingPayment={editingItem}
        paymentForm={form}
        onFormChange={setForm as any}
        onSave={handleSave}
        PAYMENT_ICONS={PAYMENT_ICONS}
      />

      <DeleteConfirmDialog 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar Método de Pago"
        description={`¿Estás seguro de que deseas eliminar el método de pago "${itemToDelete?.label}"? Esta acción no se puede deshacer.`}
        isLoading={isDeleting}
      />
    </>
  );
}
