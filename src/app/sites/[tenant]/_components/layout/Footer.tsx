import Link from 'next/link';
import Image from 'next/image';
import { FacebookIcon, InstagramIcon, TikTokIcon, TwitterIcon } from '@/components/core/icons';

interface FooterProps {
  business: {
    name: string;
    logo_url?: string;
    business_settings?: {
      phone?: string;
      description?: string;
      instagram_url?: string;
      facebook_url?: string;
      tiktok_url?: string;
      twitter_url?: string;
    }
  };
}

export default function Footer({ business }: FooterProps) {
  const logoUrl = business?.logo_url || '/logo.svg';
  const settings = business?.business_settings;
  const phoneNumber = settings?.phone || '+58 412 13 15 110';
  const description = settings?.description || 'Tu socio digital de confianza.';
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image 
              src={logoUrl} 
              alt={`${business?.name || 'simpleshop'} logo`} 
              width={120} 
              height={40} 
              className="object-contain w-auto h-8"
            />
            <span className="text-xl font-bold tracking-tighter text-black">
              {business?.name || 'simpleshop'}
            </span>
          </div>
          <p className="text-zinc-500 italic">
            {description}
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h3 className="font-bold uppercase tracking-widest text-black">Contacto</h3>
          <p className="text-zinc-500">
            WhatsApp: <br />
            <a href={`https://wa.me/${cleanPhone}`} className="text-black font-semibold hover:text-zinc-600 transition-colors" target="_blank" rel="noopener noreferrer">
              {phoneNumber}
            </a>
          </p>
          {(settings?.facebook_url || settings?.instagram_url || settings?.tiktok_url || settings?.twitter_url) && (
            <div className="flex gap-4 mt-2">
              {settings?.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-black transition-colors">
                  <InstagramIcon className="w-5 h-5" />
                </a>
              )}
              {settings?.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-black transition-colors">
                  <FacebookIcon className="w-5 h-5" />
                </a>
              )}
              {settings?.tiktok_url && (
                <a href={settings.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-black transition-colors">
                  <TikTokIcon className="w-5 h-5" />
                </a>
              )}
              {settings?.twitter_url && (
                <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-black transition-colors">
                  <TwitterIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold uppercase tracking-widest text-black">Legal</h3>
          <div className="flex flex-col gap-2">
            <Link href="/terms" className="text-zinc-500 hover:text-black transition-colors">
              Términos de Servicio
            </Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-black transition-colors">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-200 text-center text-xs text-zinc-400 font-medium">
        &copy; {new Date().getFullYear()} {business.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
