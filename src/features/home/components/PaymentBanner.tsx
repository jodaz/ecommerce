import { PayPalIcon, ZelleIcon, BinanceIcon, SmartphoneIcon, BankIcon } from '@/components/core/icons';

const paymentMethods = [
  { name: 'PayPal', icon: PayPalIcon, color: 'text-[#003087]' },
  { name: 'Zelle', icon: ZelleIcon, color: 'text-[#6d1ed1]' },
  { name: 'Binance', icon: BinanceIcon, color: 'text-[#F3BA2F]' },
  { name: 'Pago Móvil', icon: SmartphoneIcon, color: 'text-emerald-600' },
  { name: 'Transferencia Bancaria', icon: BankIcon, color: 'text-zinc-700' },
];

export default function PaymentBanner() {
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Métodos de Pago Aceptados
          </span>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {paymentMethods.map((method) => (
              <div key={method.name} className="flex items-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 cursor-default group">
                <div className="flex items-center space-x-2">
                  <method.icon className={`h-6 w-6 ${method.color}`} />
                  <span className="text-sm font-bold text-gray-800">{method.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
