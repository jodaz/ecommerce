import LocationCard from '@/components/ui/LocationCard';
import { Phone } from 'lucide-react';
import { getStoresByBusinessSlug, getBusinessBySlug } from '@/lib/api/business';
import { notFound } from 'next/navigation';

export default async function LocationsPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const business = await getBusinessBySlug(tenant);

  if (!business) {
    notFound();
  }

  const locations = await getStoresByBusinessSlug(tenant);
  const whatsappNumber = business.business_settings?.phone;

  return (
    <div className="container mx-auto px-4 py-16 flex-1 flex flex-col pt-8">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4 uppercase">Nuestras Sucursales</h1>
      <p className="text-zinc-600 mb-12 max-w-2xl text-lg">
        Visítanos en cualquiera de nuestras tiendas físicas. Tenemos la mejor atención y gran disponibilidad de repuestos y productos para entrega inmediata.
      </p>

      {locations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {locations.map((loc) => (
            <LocationCard 
              key={loc.id} 
              name={loc.name} 
              address={loc.address || ''} 
              phone={loc.phone || undefined}
              isMain={loc.is_main}
            />
          ))}
        </div>
      ) : (
        <div className="bg-zinc-50 border border-zinc-200 p-12 text-center mb-16">
          <p className="text-zinc-500 uppercase font-bold tracking-widest text-sm">No hay sucursales registradas actualmente.</p>
        </div>
      )}

      {whatsappNumber && (
        <div className="bg-zinc-50 border border-zinc-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-auto">
          <div>
            <h2 className="text-2xl font-bold text-black mb-2 uppercase">Atención al Cliente</h2>
            <p className="text-zinc-600">Nuestro equipo está listo para atender tu solicitud en línea.</p>
          </div>
          <a 
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-zinc-800 transition-colors"
          >
            <Phone size={20} />
            {whatsappNumber}
          </a>
        </div>
      )}
    </div>
  );
}
