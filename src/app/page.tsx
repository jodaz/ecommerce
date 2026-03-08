import Link from "next/link";
import { Check, ChevronRight, Layout, BarChart3, Globe, CreditCard, ShieldCheck, Settings, ShoppingBag, Package, Paintbrush, Coins, ShoppingCart } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "simpleshop | El primer Saas de E-commerce Multi-tenant en Venezuela",
  description: "Crea tu tienda online en minutos con simpleshop. La plataforma más rápida, segura y escalable para vender en Venezuela.",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
            <Image 
              src="/logo.svg" 
              alt="simpleshop logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white transition-colors">
            simple<span className="text-emerald-500 group-hover:text-emerald-400 transition-colors">shop</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#features" className="hover:text-white transition-colors">Características</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Precios</Link>
          <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="#pricing" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          >
            Ver Planes
          </Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto px-6 pt-20 pb-32 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium">
            ✨ Nueva plataforma en Venezuela
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight max-w-4xl mx-auto">
            El futuro de tu empresa <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">empieza hoy</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-400 font-light leading-relaxed">
            Únete al primer SaaS de E-commerce Multi-tenant en Venezuela y lleva tu negocio al siguiente nivel. Rápido, seguro y escalable.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 relative z-20">
            <Link 
              href="#pricing"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] flex items-center justify-center gap-2"
            >
              Comienza hoy <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              href="https://demo.jodaz.xyz"
              target="_blank"
              className="w-full sm:w-auto bg-gray-900 border border-gray-800 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center"
            >
              Ver Demo
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm text-gray-400">
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Control Absoluto</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Multimoneda</div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Escalabilidad Real</div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10 border-t border-gray-900/50">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Poder sin precedentes</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Todo lo que necesitas para gestionar, vender y escalar tu negocio en un solo lugar, con la mejor tecnología.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <ShoppingBag className="w-6 h-6 text-emerald-400" />,
                title: "Gestión de Ventas",
                desc: "Crea y administra tus ventas con facturación integrada.",
                points: ["Crear y listar ventas", "Modal de factura", "Seguimiento de estado"]
              },
              {
                icon: <Package className="w-6 h-6 text-emerald-400" />,
                title: "Control de Inventario",
                desc: "Gestiona productos y controla el stock de tu negocio.",
                points: ["Alta de productos", "Movimientos de stock", "Alertas personalizadas"]
              },
              {
                icon: <Paintbrush className="w-6 h-6 text-emerald-400" />,
                title: "Diseño Web Premium",
                desc: "Transformamos tu visión en una experiencia digital de alto impacto y conversión.",
                points: ["UI/UX: Interfaces exclusivas", "Performance Extrema", "Narrativa Visual"]
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
                title: "Dashboard y Reportes",
                desc: "Visualiza el rendimiento de tu negocio en tiempo real.",
                points: ["Gráficos de ventas", "Productos top", "Actividades recientes"]
              },
              {
                icon: <Coins className="w-6 h-6 text-emerald-400" />,
                title: "Multi-Moneda",
                desc: "Opera con diferentes monedas y tasas de cambio.",
                points: ["Moneda principal", "Tasa de cambio", "Conversión automática"]
              },
              {
                icon: <ShoppingCart className="w-6 h-6 text-emerald-400" />,
                title: "E-commerce Integrado",
                desc: "Crea tu tienda online y recibe pedidos por WhatsApp.",
                points: ["Catálogos virtuales", "Gestión de pedidos", "Links de pago"]
              }
            ].map((feature, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-emerald-500/30 transition-colors group flex flex-col h-full">
                <div className="w-12 h-12 bg-gray-950 border border-gray-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6 flex-grow">{feature.desc}</p>
                <ul className="space-y-2 mt-auto pt-6 border-t border-gray-800">
                  {feature.points.map((point, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="w-full max-w-7xl mx-auto px-6 py-24 text-center border-t border-gray-900/50">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Proyección digital sin límites</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-16">Nuestra interfaz ha sido diseñada para ser intuitiva, rápida y poderosa. Disfruta de la mejor experiencia.</p>
          
          <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden relative group translate-y-0 hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute inset-0 flex flex-col">
              <div className="h-12 border-b border-gray-700/50 bg-gray-900/50 flex items-center px-6 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 flex p-6 gap-6">
                <div className="w-1/4 h-full bg-gray-800/30 rounded-xl hidden md:flex flex-col gap-3 pt-6 px-4 border border-gray-700/30">
                  <div className="w-full h-8 bg-gray-700/50 rounded-md"></div>
                  <div className="w-3/4 h-8 bg-gray-700/30 rounded-md"></div>
                  <div className="w-5/6 h-8 bg-gray-700/30 rounded-md"></div>
                  <div className="w-full h-8 bg-gray-700/30 rounded-md mt-6"></div>
                  <div className="w-2/3 h-8 bg-gray-700/30 rounded-md"></div>
                </div>
                <div className="flex-1 flex flex-col gap-6">
                  <div className="flex gap-4 h-24">
                    <div className="flex-1 bg-gray-800/30 rounded-xl border border-gray-700/30 p-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 mb-2"></div>
                      <div className="w-1/2 h-4 bg-gray-600 rounded"></div>
                    </div>
                    <div className="flex-1 bg-gray-800/30 rounded-xl border border-gray-700/30 p-4 hidden sm:block">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 mb-2"></div>
                      <div className="w-3/4 h-4 bg-gray-600 rounded"></div>
                    </div>
                    <div className="flex-1 bg-gray-800/30 rounded-xl border border-gray-700/30 p-4 hidden md:block">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 mb-2"></div>
                      <div className="w-2/3 h-4 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-800/20 shadow-inner rounded-xl border border-gray-700/30 p-6 flex flex-col justify-end">
                    <div className="w-full h-4/5 flex items-end justify-between gap-2 px-4">
                      {[40, 70, 45, 90, 65, 80, 50, 100, 75, 85].map((h, i) => (
                        <div key={i} className="w-full bg-emerald-500/40 rounded-t-sm" style={{ height: `${h}%` }}>
                           <div className="w-full h-1 bg-emerald-400"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full max-w-7xl mx-auto px-6 py-24 relative border-t border-gray-900/50">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Inversión en tu crecimiento</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Elige el plan que mejor se adapte a tus objetivos comerciales.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan Emprendedor */}
            <div className="bg-gray-900 border border-gray-800 p-10 rounded-[2rem] relative flex flex-col hover:border-gray-700 transition-colors">
              <h3 className="text-2xl font-bold mb-2">Emprendedor</h3>
              <div className="mb-6">
                <span className="text-5xl font-extrabold">$10</span>
                <span className="text-gray-400">/ mes</span>
              </div>
              <p className="text-gray-400 mb-8 pb-8 border-b border-gray-800 min-h-[5rem]">Perfecto para negocios que están dando sus primeros pasos en el mundo digital.</p>
              
              <ul className="flex flex-col gap-4 mb-10 flex-grow">
                {["Tu propio dominio", "Productos ilimitados", "Soporte por correo y chat", "SSL Incluido", "Personalización básica", "5 Usuarios de equipo", "Pasarela de pagos local"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="https://wa.me/584121315110?text=Me%20interesa%20el%20plan%20Emprendedor" target="_blank" className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-xl font-bold text-center transition-colors">
                Contactar a Ventas
              </Link>
            </div>

            {/* Plan Profesional */}
            <div className="bg-gray-900 border-2 border-emerald-500 p-10 rounded-[2rem] relative flex flex-col transform md:-translate-y-4 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                Más popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Profesional</h3>
              <div className="mb-6">
                <span className="text-5xl font-extrabold">$25</span>
                <span className="text-gray-400">/ mes</span>
              </div>
              <p className="text-gray-400 mb-8 pb-8 border-b border-gray-800 min-h-[5rem]">Para negocios en expansión que necesitan control total y herramientas analíticas.</p>
              
              <ul className="flex flex-col gap-4 mb-10 flex-grow">
                {[<span key="all" className="inline"><strong className="text-white">Todo en Emprendedor, más:</strong></span>, "Análisis avanzado y reportes", "Soporte prioritario 24/7", "Usuarios ilimitados", "Control de Roles y Permisos", "0% Comisión por venta", "API de integraciones"].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="https://wa.me/584121315110?text=Me%20interesa%20el%20plan%20Profesional" target="_blank" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold text-center transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                Contactar a Ventas
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full max-w-3xl mx-auto px-6 py-24 relative border-t border-gray-900/50">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">¿Tienes alguna pregunta?</h2>
            <p className="text-gray-400 text-lg">Resolvemos tus dudas más frecuentes de forma directa.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            {[
              { q: "¿Cuánto tiempo toma configurar mi tienda?", a: "Literalmente minutos. Nuestra plataforma es plug-and-play. Te registras, configuras tu nombre, colores y listo." },
              { q: "¿Necesito conocimientos técnicos?", a: "Absolutamente ninguno. Todo se gestiona desde un panel visual intuitivo y muy sencillo de usar." },
              { q: "¿Puedo usar mi propio dominio?", a: "Sí, todos los planes incluyen la opción de conectar o adquirir tu propio nombre de dominio personalizado." },
              { q: "¿Qué métodos de pago soportan?", a: "Soportamos las pasarelas de pago más populares de Venezuela, incluyendo Stripe, PayPal, MercadoPago y DLocal." },
              { q: "¿Puedo cancelar en cualquier momento?", a: "Sí, sin compromisos a largo plazo. Puedes cancelar, mejorar o cambiar tu plan con un par de clics." }
            ].map((faq, i) => (
              <details key={i} className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 font-semibold cursor-pointer text-lg hover:text-emerald-400 transition-colors">
                  {faq.q}
                  <span className="transition group-open:rotate-180">
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </span>
                </summary>
                <div className="p-6 pt-0 text-gray-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="w-full max-w-7xl mx-auto px-6 py-24">
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-900/40 border border-gray-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 blur-[80px] rounded-full"></div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">Únete a la vanguardia</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
              El futuro del comercio electrónico está a un clic de distancia. Abre tu tienda hoy mismo y empieza a vender.
            </p>
            <Link 
              href="https://wa.me/584121315110?text=Hola,%20quisiera%20más%20información%20sobre%20simpleshop"
              target="_blank"
              className="inline-block bg-white text-black hover:bg-gray-200 px-10 py-5 rounded-full font-bold text-lg transition-all shadow-lg relative z-10"
            >
              Contactar al equipo de ventas
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-12 border-t border-gray-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-bold tracking-tight text-white mb-4 block">simple<span className="text-emerald-500">shop</span></span>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              La plataforma definitiva para escalar tu negocio en línea en toda Venezuela.
            </p>
            <div className="flex gap-4">
              <a href="http://instagram.com/jodaz.dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-500 transition-colors">
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
              <li><Link href="#features" className="hover:text-emerald-400 transition-colors">Características</Link></li>
              <li><Link href="#pricing" className="hover:text-emerald-400 transition-colors">Precios</Link></li>
{/* <li><Link href="#" className="hover:text-emerald-400 transition-colors">Casos de Éxito</Link></li> */}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Soporte</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              <li><Link href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</Link></li>
{/* <li><Link href="#" className="hover:text-emerald-400 transition-colors">Centro de Ayuda</Link></li> */}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Términos de Servicio</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Política de Privacidad</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-900 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} simpleshop. Todos los derechos reservados.</p>
          <p className="mt-4 md:mt-0 flex items-center gap-1">
            Powered by <a href="https://jodaz.xyz" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-400 transition-colors font-medium">Jodaz Studio</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
