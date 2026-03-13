'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@/components/core/icons';
import { useAdminStore, PaymentMethodType } from '@/stores/adminStore';

const paymentMethodSchema = z.object({
  type: z.enum(['PayPal', 'Zelle', 'Binance', 'Pago Móvil', 'Transferencia Bancaria']),
  label: z.string().min(2, 'La etiqueta es requerida'),
  details: z.string().min(5, 'Los detalles son requeridos'),
  isActive: z.boolean().default(true),
});

type PaymentMethodFormValues = z.infer<typeof paymentMethodSchema>;

export default function CreatePaymentMethodPage() {
  const router = useRouter();
  const { addPaymentMethod } = useAdminStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: 'PayPal',
      label: '',
      details: '',
      isActive: true,
    },
  });

  const onSubmit = async (data: PaymentMethodFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate API call
    addPaymentMethod(data);
    router.push('/admin/settings');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <Link
          href="/admin/settings"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4" /> Volver a Configuración
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Nuevo Método de Pago</h1>
        <p className="text-zinc-500 mt-2">Configura un nuevo método de pago para recibir pagos de tus clientes</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white border border-zinc-200 p-6 md:p-8">
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
              Tipo de Pago
            </label>
            <div className="relative">
              <select
                id="type"
                {...register('type')}
                className={`w-full h-11 px-4 border ${errors.type ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none appearance-none bg-white`}
              >
                <option value="PayPal">PayPal</option>
                <option value="Zelle">Zelle</option>
                <option value="Binance">Binance (USDT)</option>
                <option value="Pago Móvil">Pago Móvil</option>
                <option value="Transferencia Bancaria">Transferencia Bancaria</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            {errors.type && <p className="text-red-500 text-xs font-semibold">{errors.type.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="label" className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
              Etiqueta Descriptiva
            </label>
            <input
              id="label"
              type="text"
              {...register('label')}
              className={`w-full h-11 px-4 border ${errors.label ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
              placeholder="Ej. Mi Cuenta Banesco, PayPal Principal"
            />
            {errors.label && <p className="text-red-500 text-xs font-semibold">{errors.label.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="details" className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
              Detalles de Pago
            </label>
            <textarea
              id="details"
              {...register('details')}
              rows={4}
              className={`w-full p-4 border ${errors.details ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none resize-none`}
              placeholder="Ej. Correo, Teléfono, Cédula, Número de Cuenta, etc."
            />
            <p className="text-xs text-zinc-400">Esta información será mostrada al cliente para que realice el pago.</p>
            {errors.details && <p className="text-red-500 text-xs font-semibold">{errors.details.message}</p>}
          </div>

          <div className="flex items-center gap-3">
            <input
              id="isActive"
              type="checkbox"
              {...register('isActive')}
              className="w-4 h-4 accent-black"
            />
            <label htmlFor="isActive" className="text-sm font-bold uppercase tracking-widest text-zinc-800 cursor-pointer">
              Activo
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-zinc-200 flex gap-4 justify-end">
          <Link
            href="/admin/settings"
            className="px-8 py-3 text-sm font-bold uppercase tracking-widest border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-black transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 text-sm font-bold uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Guardando...' : 'Crear Método'}
          </button>
        </div>
      </form>
    </div>
  );
}
