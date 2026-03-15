'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCartStore } from '@/stores/cartStore';
import { PriceDisplayClient } from '@/components/ui/price-display-client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  CreditCard, 
  User, 
  MapPin, 
  Phone, 
  Hash, 
  Camera, 
  Loader2, 
  ArrowRight, 
  ShoppingBag,
  Copy,
  Check
} from 'lucide-react';
import { 
  PayPalIcon, 
  ZelleIcon, 
  BinanceIcon, 
  SmartphoneIcon, 
  BankIcon 
} from '@/components/core/icons';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import React from 'react';

import Image from 'next/image';

const PAYMENT_ICONS: Record<string, any> = {
  'PayPal': PayPalIcon,
  'Zelle': ZelleIcon,
  'Binance': BinanceIcon,
  'Pago Móvil': SmartphoneIcon,
  'Transferencia Bancaria': BankIcon,
};

const PAYMENT_COLORS: Record<string, string> = {
  'PayPal': 'text-[#003087]',
  'Zelle': 'text-[#6d1ed1]',
  'Binance': 'text-[#F3BA2F]',
  'Pago Móvil': 'text-emerald-600',
  'Transferencia Bancaria': 'text-zinc-700',
};

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Nombre completo requerido'),
  cedula: z.string().min(5, 'Cédula de identidad requerida'),
  address: z.string().min(10, 'Dirección detallada requerida'),
  phone: z.string().min(10, 'Número de teléfono válido requerido'),
  paymentMethodId: z.string().min(1, 'Seleccione un método de pago'),
  paymentReference: z.string().min(4, 'Número de referencia requerido'),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  business: {
    name: string;
    id: string;
  };
  paymentMethods: Array<{
    id: string;
    type: string;
    label: string;
    details: string;
  }>;
  usdRate: number;
}

export default function CheckoutForm({ business, paymentMethods, usdRate }: CheckoutFormProps) {
  const { items, getTotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      // Modern API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          // Fallback failed
        }
        document.body.removeChild(textArea);
      }
      
      setIsCopied(true);
      toast.success('Copiado al portapapeles', {
        className: "bg-black text-white rounded-none border border-zinc-800 font-bold uppercase tracking-widest text-[10px]"
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      // Final fallback/error handling if everything fails
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      cedula: '',
      address: '',
      phone: '',
      paymentMethodId: '',
      paymentReference: '',
    },
  });

  const selectedPaymentMethodId = watch('paymentMethodId');
  const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedPaymentMethodId);

  const onSubmit = async (data: CheckoutValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: business.id,
          customer_name: data.fullName,
          customer_id_number: data.cedula,
          customer_phone: data.phone,
          customer_address: data.address,
          total_amount: total,
          payment_method_id: data.paymentMethodId,
          payment_reference: data.paymentReference,
          items: items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      setShowSuccessModal(true);
    } catch (error: any) {
      alert(error.message || 'Error al procesar el pedido. Por favor intente de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalClose = () => {
    clearCart();
    router.push('/');
  };

  if (!mounted) return null;

  if (items.length === 0 && !showSuccessModal) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-zinc-200">
          <ShoppingBag size={48} className="text-zinc-300" />
        </div>
        <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">Tu carrito está vacío</h2>
        <p className="text-zinc-500 mb-8 max-w-xs">Agrega algunos productos antes de proceder al pago.</p>
        <button
          onClick={() => router.push('/products')}
          className="bg-black text-white px-8 h-14 font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95"
        >
          Ir al catálogo
        </button>
      </div>
    );
  }

  const total = getTotal();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Form Section */}
      <div className="lg:col-span-7">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Section: Personal Info */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black rounded">1</div>
              <h2 className="text-xl font-bold uppercase tracking-widest">Información Personal</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <User size={14} /> Nombre Completo
                </label>
                <input
                  {...register('fullName')}
                  placeholder="Ej: Juan Pérez"
                  className={cn(
                    "w-full h-12 px-4 border-2 border-zinc-200 focus:border-black outline-none transition-colors font-medium",
                    errors.fullName && "border-red-500"
                  )}
                />
                {errors.fullName && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.fullName.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Hash size={14} /> Cédula de Identidad
                </label>
                <input
                  {...register('cedula')}
                  placeholder="Ej: V-12345678"
                  className={cn(
                    "w-full h-12 px-4 border-2 border-zinc-200 focus:border-black outline-none transition-colors font-medium",
                    errors.cedula && "border-red-500"
                  )}
                />
                {errors.cedula && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.cedula.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <MapPin size={14} /> Dirección de Entrega
              </label>
              <textarea
                {...register('address')}
                placeholder="Calle, Edificio, Apartamento, Punto de referencia..."
                rows={3}
                className={cn(
                  "w-full p-4 border-2 border-zinc-200 focus:border-black outline-none transition-colors font-medium resize-none",
                  errors.address && "border-red-500"
                )}
              />
              {errors.address && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.address.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Phone size={14} /> Teléfono (WhatsApp)
              </label>
              <input
                {...register('phone')}
                placeholder="Ej: 04121234567"
                className={cn(
                  "w-full h-12 px-4 border-2 border-zinc-200 focus:border-black outline-none transition-colors font-medium",
                  errors.phone && "border-red-500"
                )}
              />
              {errors.phone && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.phone.message}</p>}
            </div>
          </section>

          {/* Section: Payment Info */}
          <section className="space-y-6 pt-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black rounded">2</div>
              <h2 className="text-xl font-bold uppercase tracking-widest">Método de Pago</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentMethods.map((method) => {
                const Icon = PAYMENT_ICONS[method.type] || CreditCard;
                const colorClass = PAYMENT_COLORS[method.type] || 'text-zinc-500';
                
                return (
                  <label 
                    key={method.id}
                    className={cn(
                      "relative flex flex-col p-4 border-2 cursor-pointer transition-all hover:bg-zinc-50 group",
                      selectedPaymentMethodId === method.id 
                        ? "border-black bg-zinc-50" 
                        : "border-zinc-100"
                    )}
                  >
                    <input
                      type="radio"
                      value={method.id}
                      {...register('paymentMethodId')}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-lg bg-zinc-100 group-hover:bg-white transition-colors", colorClass)}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-tight">{method.label}</span>
                      </div>
                      {selectedPaymentMethodId === method.id && <CheckCircle2 size={16} className="text-black" />}
                    </div>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold ml-8">{method.type}</span>
                  </label>
                );
              })}
            </div>
            {errors.paymentMethodId && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.paymentMethodId.message}</p>}

            {selectedPaymentMethod && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-zinc-950 text-white rounded space-y-4 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    Datos para el pago
                  </h3>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(selectedPaymentMethod.details)}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isCopied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          className="flex items-center gap-1.5 text-emerald-400"
                        >
                          <Check size={12} strokeWidth={3} />
                          <span>Copiado</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          className="flex items-center gap-1.5"
                        >
                          <Copy size={12} />
                          <span>Copiar</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
                <div className="whitespace-pre-line text-sm font-medium leading-relaxed">
                  {selectedPaymentMethod.details}
                </div>

                {/* Prominent Alert when copied */}
                <AnimatePresence>
                  {isCopied && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="bg-emerald-500/20 border border-emerald-500/50 p-3 flex items-center gap-3 overflow-hidden"
                    >
                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                        ¡Listo! Los datos han sido copiados a tu portapapeles.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Subtle background decoration */}
                <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none transition-transform group-hover:scale-110 duration-700">
                  {PAYMENT_ICONS[selectedPaymentMethod.type] && React.createElement(PAYMENT_ICONS[selectedPaymentMethod.type], { className: "w-24 h-24" })}
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <CreditCard size={14} /> Referencia de Pago
                </label>
                <input
                  {...register('paymentReference')}
                  placeholder="Últimos 4-6 dígitos"
                  className={cn(
                    "w-full h-12 px-4 border-2 border-zinc-200 focus:border-black outline-none transition-colors font-medium",
                    errors.paymentReference && "border-red-500"
                  )}
                />
                {errors.paymentReference && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.paymentReference.message}</p>}
              </div>

              <div className="space-y-2 opacity-50 cursor-not-allowed">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Camera size={14} /> Captura (Opcional)
                </label>
                <div className="w-full h-12 px-4 border-2 border-zinc-100 bg-zinc-50 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  Próximamente
                </div>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white h-16 flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:bg-zinc-400 disabled:scale-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                Confirmar y Finalizar
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Summary Section */}
      <div className="lg:col-span-5">
        <div className="sticky top-24 bg-zinc-50 border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <div className="p-6 bg-white border-b border-zinc-200">
            <h2 className="text-lg font-black uppercase tracking-widest">Resumen del Pedido</h2>
          </div>
          
          <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-16 h-16 flex-shrink-0 bg-white border border-zinc-200 rounded overflow-hidden">
                  {item.image && (
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover" 
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h3 className="text-sm font-bold uppercase tracking-tight text-black truncate">{item.name}</h3>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Cant: {item.quantity}</p>
                  <div className="mt-1">
                    <PriceDisplayClient 
                      amount={item.price * item.quantity} 
                      exchangeRate={usdRate}
                      className="text-sm" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-zinc-100/50 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Subtotal</span>
              <PriceDisplayClient 
                amount={total} 
                exchangeRate={usdRate}
                className="text-lg font-bold" 
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Envío</span>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Gratis</span>
            </div>
            <div className="flex items-center justify-between pt-4">
              <span className="text-sm font-black uppercase tracking-[0.2em]">Total</span>
              <div className="text-right">
                <PriceDisplayClient 
                  amount={total} 
                  exchangeRate={usdRate}
                  className="text-3xl font-black text-black" 
                  vesClassName="text-sm font-bold" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg p-10 text-center shadow-2xl rounded-xl"
            >
              <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <CheckCircle2 size={48} />
              </div>
              
              <h2 className="text-3xl font-black uppercase tracking-tight mb-4">¡Pedido Recibido!</h2>
              <p className="text-zinc-600 font-medium text-lg leading-relaxed mb-10">
                Gracias por tu compra. Una persona se comunicará a través del medio seleccionado para confirmar su compra.
              </p>
              
              <button
                onClick={handleFinalClose}
                className="w-full bg-black text-white h-16 font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all active:scale-95 shadow-xl"
              >
                Volver al inicio
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
