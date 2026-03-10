import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 py-12 border-t border-gray-900 mt-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block py-1">
            <span className="text-2xl font-bold tracking-tight text-white mb-4 block">
              simple<span className="text-emerald-500">shop</span>
            </span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 pr-4">
            La plataforma definitiva para escalar tu negocio en línea en toda Venezuela.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/simpleshop.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-500 transition-colors inline-block py-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Producto</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li><Link href="/#features" className="hover:text-emerald-400 transition-colors inline-block py-1">Características</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Soporte</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li><Link href="/#faq" className="hover:text-emerald-400 transition-colors inline-block py-1">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Legal</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li><Link href="/terms" className="hover:text-emerald-400 transition-colors inline-block py-1">Términos de Servicio</Link></li>
            <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors inline-block py-1">Política de Privacidad</Link></li>
            <li><Link href="/cookies" className="hover:text-emerald-400 transition-colors inline-block py-1">Política de Cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-900 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} simpleshop. Todos los derechos reservados.</p>
        <p className="mt-4 md:mt-0 flex items-center gap-1">
          Powered by <a href="https://jodaz.xyz" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-400 transition-colors font-medium inline-block py-1">Jodaz Studio</a>
        </p>
      </div>
    </footer>
  );
}
