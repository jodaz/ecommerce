import LocationCard from '@/components/ui/LocationCard';
import { Phone } from 'lucide-react';

export default function ContactPage() {
  const locations = [
    { name: 'Sede Principal', address: 'Calle Independencia (Al lado del Banco de Venezuela)' },
    { name: 'Sucursal Mini Terminal', address: 'Calle Carabobo, frente del Mini terminal' },
    { name: 'Sucursal Las Margaritas', address: 'Calle Las Margaritas, frente al estacionamiento del Banco de Venezuela' },
    { name: 'Sucursal C.C Cristal', address: 'C.C Cristal, Planta Baja' }
  ];

  return (
    <div className="container mx-auto px-4 py-16 flex-1 flex flex-col pt-8">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4 uppercase">Nuestras Sucursales</h1>
      <p className="text-zinc-600 mb-12 max-w-2xl text-lg">
        Visítanos en cualquiera de nuestras tiendas físicas. Tenemos la mejor atención y gran disponibilidad de repuestos y equipos para entrega inmediata.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
        {locations.map((loc, i) => (
          <LocationCard key={i} name={loc.name} address={loc.address} />
        ))}
      </div>

      <div className="bg-zinc-50 border border-zinc-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2 uppercase">Ventas por WhatsApp</h2>
          <p className="text-zinc-600">Nuestro equipo está listo para atender tu solicitud en línea.</p>
        </div>
        <a 
          href="https://wa.me/5804121833072" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-zinc-800 transition-colors"
        >
          <Phone size={20} />
          +58 0412 1833072
        </a>
      </div>
    </div>
  );
}
