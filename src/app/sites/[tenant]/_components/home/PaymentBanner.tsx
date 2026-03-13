import { PayPalIcon, ZelleIcon, BinanceIcon, SmartphoneIcon, BankIcon } from '@/components/core/icons';

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

interface PaymentMethod {
  id: string;
  type: string;
  label: string;
  details: string;
}

interface PaymentBannerProps {
  methods: PaymentMethod[];
}

export default function PaymentBanner({ methods = [] }: PaymentBannerProps) {
  if (methods.length === 0) return null;

  return (
    <section className="bg-gray-50 border-y border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Métodos de Pago Aceptados
          </span>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {methods.map((method) => {
              const Icon = PAYMENT_ICONS[method.type] || BankIcon;
              const color = PAYMENT_COLORS[method.type] || 'text-zinc-700';
              return (
                <div key={method.id} className="flex flex-col items-center group" title={method.details}>
                  <div className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 cursor-default">
                    <Icon className={`h-6 w-6 ${color}`} />
                    <span className="text-sm font-bold text-gray-800">{method.type}</span>
                  </div>
                  {method.label && <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">{method.label}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
