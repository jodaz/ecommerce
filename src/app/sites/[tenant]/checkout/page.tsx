import { getBusinessBySlug, getPaymentMethodsForBusiness } from '@/lib/api/business';
import { getExchangeRates } from '@/lib/currency';
import { notFound } from 'next/navigation';
import CheckoutForm from './CheckoutForm';

export default async function CheckoutPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  
  const business = await getBusinessBySlug(tenant);
  if (!business) {
    notFound();
  }

  const [paymentMethods, rates] = await Promise.all([
    getPaymentMethodsForBusiness(business.id),
    getExchangeRates()
  ]);

  const usdRate = rates?.USD || 1;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-4">
          Finalizar Compra
        </h1>
        
        <CheckoutForm 
          business={{
            id: business.id,
            name: business.name
          }} 
          paymentMethods={paymentMethods.map(m => ({
            id: m.id,
            type: m.type,
            label: m.label,
            details: m.details
          }))} 
          usdRate={usdRate}
        />
      </div>
    </div>
  );
}
