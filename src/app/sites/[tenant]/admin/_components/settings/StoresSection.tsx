'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getStores, createStore, updateStore, deleteStore } from '@/lib/api/inventory-client';
import StoresTable from './StoresTable';
import StoreModal from './StoreModal';
import DeleteConfirmDialog from '@/components/ui/DeleteConfirmDialog';

interface StoresSectionProps {
  businessId: string;
  userRole?: string;
}

export default function StoresSection({ businessId, userRole }: StoresSectionProps) {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form, setForm] = useState({ name: '', address: '', phone: '', is_active: true, is_main: false });
  
  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string, name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getStores(businessId);
      setStores(data || []);
    } catch (error) {
      toast.error('Error al cargar las sucursales');
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
        const updated = await updateStore(editingItem.id, { ...form, business_id: businessId });
        // After an update that might change the "is_main" status, it's safer to re-fetch to ensure sync
        if (form.is_main) {
          await loadData();
        } else {
          setStores(prev => prev.map(s => s.id === editingItem.id ? updated : s));
        }
        toast.success('Sucursal actualizada', { className: "bg-black text-white rounded-none border border-zinc-800 font-bold uppercase tracking-widest text-[10px]" });
      } else {
        await createStore({ ...form, business_id: businessId });
        await loadData();
        toast.success('Sucursal agregada', { className: "bg-black text-white rounded-none border border-zinc-800 font-bold uppercase tracking-widest text-[10px]" });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error al guardar la sucursal');
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      setIsDeleting(true);
      await deleteStore(itemToDelete.id);
      setStores(prev => prev.filter(s => s.id !== itemToDelete.id));
      toast.success('Sucursal eliminada', { className: 'bg-black text-white rounded-none border border-zinc-800 font-bold uppercase tracking-widest text-[10px]' });
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar sucursal');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <StoresTable 
        stores={stores}
        loadingStores={loading}
        userRole={userRole}
        onAddStore={() => {
          setEditingItem(null);
          setForm({ name: '', address: '', phone: '', is_active: true, is_main: stores.length === 0 });
          setIsModalOpen(true);
        }}
        onEditStore={(store) => {
          setEditingItem(store);
          setForm({
            name: store.name,
            address: store.address || '',
            phone: store.phone || '',
            is_active: store.is_active,
            is_main: store.is_main
          });
          setIsModalOpen(true);
        }}
        onDeleteStore={(id, name) => {
          setItemToDelete({ id, name });
          setIsDeleteModalOpen(true);
        }}
      />

      <StoreModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingStore={editingItem}
        storeForm={form}
        onFormChange={setForm as any}
        onSave={handleSave}
      />

      <DeleteConfirmDialog 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar Sucursal"
        description={`¿Estás seguro de que deseas eliminar la sucursal "${itemToDelete?.name}"? Esta acción no se puede deshacer.`}
        isLoading={isDeleting}
      />
    </>
  );
}
