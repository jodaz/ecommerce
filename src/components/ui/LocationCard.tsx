import { MapPin, Phone } from 'lucide-react';

interface LocationCardProps {
  name: string;
  address: string;
  phone?: string;
  isMain?: boolean;
}

export default function LocationCard({ name, address, phone, isMain }: LocationCardProps) {
  return (
    <div className={`border p-6 flex flex-col gap-4 bg-white hover:border-black transition-colors rounded-none relative ${isMain ? 'border-black' : 'border-zinc-200'}`}>
      {isMain && (
        <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest">
          Sede Principal
        </span>
      )}
      <div className="flex items-center gap-3">
        <span className="bg-black text-white p-2 flex items-center justify-center shrink-0">
          <MapPin size={24} />
        </span>
        <h3 className="text-xl font-bold tracking-tight text-black flex-1">{name}</h3>
      </div>
      <p className="text-zinc-600 text-sm leading-relaxed">
        {address}
      </p>
      {phone && (
        <div className="flex items-center gap-2 text-zinc-500 text-sm mt-auto border-t border-zinc-100 pt-4">
          <Phone size={14} />
          <span>{phone}</span>
        </div>
      )}
    </div>
  );
}
