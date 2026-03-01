import { MapPin } from 'lucide-react';

interface LocationCardProps {
  name: string;
  address: string;
}

export default function LocationCard({ name, address }: LocationCardProps) {
  return (
    <div className="border border-zinc-200 p-6 flex flex-col gap-4 bg-white hover:border-black transition-colors rounded-none">
      <div className="flex items-center gap-3">
        <span className="bg-black text-white p-2 flex items-center justify-center">
          <MapPin size={24} />
        </span>
        <h3 className="text-xl font-bold tracking-tight text-black">{name}</h3>
      </div>
      <p className="text-zinc-600 text-sm leading-relaxed">
        {address}
      </p>
    </div>
  );
}
