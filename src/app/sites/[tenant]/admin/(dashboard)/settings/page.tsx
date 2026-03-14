'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useAdminStore } from '@/stores/adminStore';
import { toast } from 'sonner';
import { PencilIcon, Trash2Icon } from '@/components/core/icons';

// Modular Components
import BusinessProfileForm from '../../_components/settings/BusinessProfileForm';
import PaymentMethodsSection from '../../_components/settings/PaymentMethodsSection';
import StoresSection from '../../_components/settings/StoresSection';

const settingsSchema = z.object({
  companyName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().optional(),
  phone: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  twitter: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;


export default function AdminSettingsPage() {
  const { 
    activeBusiness, 
    businessSettings, 
    profiles,
    deleteProfile,
    login
  } = useAdminStore();

  console.log('AdminSettingsPage Render: activeBusiness:', activeBusiness?.id, 'businessSettings:', businessSettings?.business_id);
  
  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(activeBusiness?.logo_url || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoadingData, setIsLoadingData] = useState(false);

  const params = useParams();
  const tenant = params.tenant as string;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: activeBusiness?.name || '',
      description: businessSettings?.description || '',
      phone: businessSettings?.phone || '',
      facebook: businessSettings?.facebook_url || '',
      instagram: businessSettings?.instagram_url || '',
      tiktok: businessSettings?.tiktok_url || '',
      twitter: businessSettings?.twitter_url || '',
    },
  });

  // Hydrate store if needed
  useEffect(() => {
    const hydrateStore = async () => {
      if ((!activeBusiness || !businessSettings) && tenant) {
        setIsLoadingData(true);
        try {
          console.log('Hydrating store for tenant:', tenant);
          const res = await fetch(`/api/businesses?slug=${tenant}`);
          if (res.ok) {
            const data = await res.json();
            
            // We need current profile too. 
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
              
              if (profile) {
                login(profile, data, data.business_settings || null);
              }
            }
          }
        } catch (error) {
          console.error('Error hydrating store:', error);
        } finally {
          setIsLoadingData(false);
        }
      }
    };

    hydrateStore();
  }, [activeBusiness, businessSettings, login, tenant]);

  useEffect(() => {
    // Only reset form if not currently editing to prevent wiping user input
    if (!isEditingProfile && (activeBusiness || businessSettings)) {
      console.log('Syncing form with store data');
      reset({
        companyName: activeBusiness?.name || '',
        description: businessSettings?.description || '',
        phone: businessSettings?.phone || '',
        facebook: businessSettings?.facebook_url || '',
        instagram: businessSettings?.instagram_url || '',
        tiktok: businessSettings?.tiktok_url || '',
        twitter: businessSettings?.twitter_url || '',
      });
      setPreviewUrl(activeBusiness?.logo_url || null);
    }
  }, [activeBusiness, businessSettings, reset, isEditingProfile]);

  const onSubmit = async (data: SettingsFormValues) => {
    console.log('DEBUG: onSubmit triggered with raw data:', JSON.stringify(data, null, 2));
    if (!activeBusiness) {
      console.error('Client Error: activeBusiness is null');
      toast.error('Sesión inválida. Por favor, inicie sesión de nuevo.');
      return;
    }

    if (!activeBusiness.id) {
      console.error('Client Error: activeBusiness.id is missing', activeBusiness);
      toast.error('Error de configuración: ID de negocio faltante.');
      return;
    }

    try {
      let finalLogoUrl = activeBusiness.logo_url;

      if (logoFile) {
        const formData = new FormData();
        formData.append('file', logoFile);
        formData.append('folder', 'business-logos');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) throw new Error('Error al subir el logo');
        const uploadData = await uploadRes.json();
        finalLogoUrl = uploadData.url;
      }

      const payload = {
        businessId: activeBusiness.id,
        name: data.companyName,
        description: data.description || '',
        phone: data.phone || '',
        facebook_url: data.facebook || '',
        instagram_url: data.instagram || '',
        tiktok_url: data.tiktok || '',
        twitter_url: data.twitter || '',
        logo_url: finalLogoUrl
      };

      console.log('DEBUG: Submitting payload to API:', JSON.stringify(payload, null, 2));

      const response = await fetch('/api/businesses/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Error al guardar la configuración');

      const currentState = useAdminStore.getState();
      const updatedBusiness = { ...activeBusiness, id: activeBusiness.id, name: data.companyName, logo_url: finalLogoUrl };
      const updatedSettings = { 
        ...businessSettings!, 
        business_id: activeBusiness.id,
        description: data.description || '',
        phone: data.phone || '',
        facebook_url: data.facebook || '',
        instagram_url: data.instagram || '',
        tiktok_url: data.tiktok || '',
        twitter_url: data.twitter || ''
      };

      login(
        currentState.currentProfile!, 
        updatedBusiness as any, 
        updatedSettings as any
      );

      setIsEditingProfile(false);
      toast.success('Configuración guardada correctamente', {
        className: "bg-black text-white rounded-none border border-zinc-800 font-bold uppercase tracking-widest text-[10px]"
      });
    } catch (error: any) {
      toast.error(error.message || 'Error desconocido', {
        className: "bg-black text-white rounded-none border border-zinc-800 font-bold uppercase tracking-widest text-[10px]"
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 text-black">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-zinc-500 mt-2 font-medium">Administrar perfil de la empresa, redes sociales, métodos de pago y usuarios</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <BusinessProfileForm 
          register={register as any}
          errors={errors}
          previewUrl={previewUrl}
          onLogoClick={() => fileInputRef.current?.click()}
          fileInputRef={fileInputRef}
          onLogoChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              setLogoFile(file);
              const reader = new FileReader();
              reader.onload = (event) => setPreviewUrl(event.target?.result as string);
              reader.readAsDataURL(file);
            }
          }}
          isEditing={isEditingProfile}
          isSubmitting={isSubmitting}
          onEdit={() => setIsEditingProfile(true)}
          onCancel={() => {
            setIsEditingProfile(false);
            reset();
            setPreviewUrl(activeBusiness?.logo_url || null);
            setLogoFile(null);
          }}
          businessData={activeBusiness}
          settingsData={businessSettings}
        />
      </form>

      {activeBusiness && (
        <>
          <PaymentMethodsSection businessId={activeBusiness.id} />
          <StoresSection businessId={activeBusiness.id} userRole={useAdminStore.getState().currentProfile?.role} />
        </>
      )}

      <div className="space-y-6 bg-white border border-zinc-200 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-200">
          <h2 className="text-lg font-bold tracking-tight">Usuarios</h2>
          <Link 
            href="/admin/settings/users/new"
            className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shrink-0"
          >
            Nuevo Usuario
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50 uppercase tracking-widest text-xs font-semibold text-zinc-500">
              <tr>
                <th className="px-6 py-4 border-b border-zinc-200">Nombre</th>
                <th className="px-6 py-4 border-b border-zinc-200">Correo Electrónico</th>
                <th className="px-6 py-4 border-b border-zinc-200">Rol</th>
                <th className="px-6 py-4 border-b border-zinc-200 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {profiles.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-50 transition-colors font-medium">
                  <td className="px-6 py-4 font-bold">{p.full_name}</td>
                  <td className="px-6 py-4 text-zinc-600">user@example.com</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 bg-zinc-100 font-bold text-[10px] tracking-widest border border-zinc-200 uppercase">
                      {p.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-zinc-400 hover:text-black transition-colors" title="Editar">
                      <PencilIcon className="w-4 h-4 inline-block" />
                    </button>
                    <button onClick={() => deleteProfile(p.id)} className="text-zinc-400 hover:text-red-600 transition-colors" title="Eliminar">
                      <Trash2Icon className="w-4 h-4 inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
              {profiles.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-zinc-500 uppercase text-xs tracking-widest font-bold">No hay usuarios registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4 bg-white border border-zinc-200 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Categorías de Productos</h2>
            <p className="text-sm text-zinc-500 mt-1">
              Administrar categorías y secciones de tu sitio web.
            </p>
          </div>
          <Link 
            href="/admin/categories"
            className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shrink-0"
          >
            Gestionar Categorías
          </Link>
        </div>
      </div>
      
    </div>
  );
}
