import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Productos Column */}
          <div>
            <h3 className="text-black font-bold text-sm uppercase tracking-wider mb-4">Productos</h3>
            <ul className="space-y-2">
              {[
                'Congeladores',
                'Hogar',
                'Televisores',
                'Aires Acondicionados',
                'Neveras',
                'Lavadoras',
              ].map((item) => (
                <li key={item}>
                  <Link href={`/category/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-500 hover:text-black text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Políticas Column */}
          <div>
            <h3 className="text-black font-bold text-sm uppercase tracking-wider mb-4">Políticas</h3>
            <ul className="space-y-2">
              {['Garantía', 'Envíos', 'Términos y Condiciones', 'Privacidad'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-500 hover:text-black text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tiendas Column */}
          <div>
            <h3 className="text-black font-bold text-sm uppercase tracking-wider mb-4">Tiendas</h3>
            <ul className="space-y-2">
              {['Caracas', 'Valencia', 'Maracaibo', 'Barquisimeto'].map((item) => (
                <li key={item}>
                  <Link href={`/tiendas/${item.toLowerCase()}`} className="text-gray-500 hover:text-black text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto Column */}
          <div>
            <h3 className="text-black font-bold text-sm uppercase tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-500 text-sm">
                <Phone size={16} />
                <span>+58 212 000 0000</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500 text-sm">
                <Mail size={16} />
                <span>info@jodaz.com</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-500 text-sm">
                <MapPin size={16} className="mt-0.5" />
                <span>Av. Principal, Edif. Home Goods, Caracas.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Legal */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-black transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-black transition-colors">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-black transition-colors">
              <Twitter size={20} />
            </Link>
          </div>
          <p className="text-gray-400 text-xs">
            © {currentYear} JODAZ. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
