import Image from 'next/image';

const paymentMethods = [
  { name: 'Pago Móvil', icon: '/icons/pago-movil.svg' },
  { name: 'Zelle', icon: '/icons/zelle.svg' },
  { name: 'Banesco', icon: '/icons/banesco.svg' },
  { name: 'Mercantil', icon: '/icons/mercantil.svg' },
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
              <div key={method.name} className="flex items-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 cursor-default">
                <div className="h-6 w-16 relative">
                  {/* For now, using text as placeholder for icons until I generate/find them */}
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
