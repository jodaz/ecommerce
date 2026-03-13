import Link from "next/link";
import { 
  CheckIcon, 
  ChevronRightIcon, 
  LayoutIcon, 
  BarChartIcon, 
  GlobeIcon, 
  CreditCardIcon, 
  ShieldCheckIcon, 
  SettingsIcon, 
  ShoppingBagIcon, 
  PackageIcon, 
  PaintbrushIcon, 
  CoinsIcon, 
  ShoppingCartIcon 
} from "@/components/core/icons";
import { Metadata } from "next";
import Image from "next/image";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

export const metadata: Metadata = {
  title: "simpleshop | Gestión Empresarial Completa en Venezuela",
  description: "Administra ventas, inventario, clientes y finanzas desde una sola plataforma. Control total de tu negocio en tiempo real.",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Navigation */}
      <PublicNavbar />

      <main className="flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto px-6 pt-20 pb-32 text-center relative mt-10 md:mt-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[300px] sm:max-w-[500px] md:max-w-[800px] h-[200px] md:h-[400px] bg-emerald-600/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium relative z-10">
            ✨ Nueva plataforma en Venezuela
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight max-w-4xl mx-auto relative z-10">
            Digitaliza tu empresa <br className="hidden sm:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 italic">¡En minutos!</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-400 font-light leading-relaxed">
            La plataforma de gestión empresarial más completa de Venezuela. Administra ventas, inventario y finanzas en tiempo real.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 relative z-20">
            <Link 
              href="https://wa.me/584121315110?text=Hola,%20quisiera%20solicitar%20un%20demo%20de%20simpleshop"
              target="_blank"
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] flex items-center gap-2"
            >
              Solicitar demo
            </Link>
            <Link 
              href="http://demo.simpleshop.local:3000/admin" 
              target="_blank" 
              className="bg-transparent border-2 border-gray-700 text-white hover:border-gray-500 hover:bg-gray-800/50 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2"
            >
              Ver demo
              <ChevronRightIcon className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm text-gray-400">
            <div className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-500" /> Control Absoluto</div>
            <div className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-500" /> Multimoneda</div>
            <div className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-500" /> Escalabilidad Real</div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10 border-t border-gray-900/50">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Poder sin precedentes</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">Todo lo que necesitas para gestionar, vender y escalar tu negocio en un solo lugar, con la mejor tecnología.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <ShoppingBagIcon className="w-6 h-6 text-emerald-400" />,
                title: "Gestión de Ventas",
                desc: "Crea y administra tus ventas con facturación integrada.",
                points: ["Crear y listar ventas", "Modal de factura", "Seguimiento de estado"]
              },
              {
                icon: <PackageIcon className="w-6 h-6 text-emerald-400" />,
                title: "Control de Inventario",
                desc: "Gestiona productos y controla el stock de tu negocio.",
                points: ["Alta de productos", "Movimientos de stock", "Alertas personalizadas"]
              },
              {
                icon: <PaintbrushIcon className="w-6 h-6 text-emerald-400" />,
                title: "Diseño Web Premium",
                desc: "Transformamos tu visión en una experiencia digital de alto impacto y conversión.",
                points: ["UI/UX: Interfaces exclusivas", "Performance Extrema", "Narrativa Visual"]
              },
              {
                icon: <BarChartIcon className="w-6 h-6 text-emerald-400" />,
                title: "Dashboard y Reportes",
                desc: "Visualiza el rendimiento de tu negocio en tiempo real.",
                points: ["Gráficos de ventas", "Productos top", "Actividades recientes"]
              },
              {
                icon: <CoinsIcon className="w-6 h-6 text-emerald-400" />,
                title: "Multi-Moneda",
                desc: "Opera con diferentes monedas y tasas de cambio.",
                points: ["Moneda principal", "Tasa de cambio", "Conversión automática"]
              },
              {
                icon: <ShoppingCartIcon className="w-6 h-6 text-emerald-400" />,
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
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center border-t border-gray-900/50">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Proyección digital sin límites</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg mb-12 md:mb-16">Nuestra interfaz ha sido diseñada para ser intuitiva, rápida y poderosa. Disfruta de la mejor experiencia.</p>
          
          <div className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden relative group translate-y-0 hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute inset-0 flex flex-col">
              <div className="h-8 md:h-12 border-b border-gray-700/50 bg-gray-900/50 flex items-center px-4 md:px-6 gap-2">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 flex p-4 md:p-6 gap-4 md:gap-6">
                <div className="w-1/4 h-full bg-gray-800/30 rounded-xl hidden md:flex flex-col gap-3 pt-6 px-4 border border-gray-700/30">
                  <div className="w-full h-8 bg-gray-700/50 rounded-md"></div>
                  <div className="w-3/4 h-8 bg-gray-700/30 rounded-md"></div>
                  <div className="w-5/6 h-8 bg-gray-700/30 rounded-md"></div>
                  <div className="w-full h-8 bg-gray-700/30 rounded-md mt-6"></div>
                  <div className="w-2/3 h-8 bg-gray-700/30 rounded-md"></div>
                </div>
                <div className="flex-1 flex flex-col gap-4 md:gap-6">
                  <div className="flex gap-2 sm:gap-4 h-20 md:h-24">
                    <div className="flex-1 bg-gray-800/30 rounded-xl border border-gray-700/30 p-2 sm:p-4">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-emerald-500/20 mb-2"></div>
                      <div className="w-full sm:w-1/2 h-3 md:h-4 bg-gray-600 rounded"></div>
                    </div>
                    <div className="flex-1 bg-gray-800/30 rounded-xl border border-gray-700/30 p-2 sm:p-4 hidden sm:block">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-500/20 mb-2"></div>
                      <div className="w-3/4 h-3 md:h-4 bg-gray-600 rounded"></div>
                    </div>
                    <div className="flex-1 bg-gray-800/30 rounded-xl border border-gray-700/30 p-2 sm:p-4 hidden md:block">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-purple-500/20 mb-2"></div>
                      <div className="w-2/3 h-3 md:h-4 bg-gray-600 rounded"></div>
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

        {/* Pricing Section hidden for release */}

        {/* FAQ Section */}
        <section id="faq" className="w-full max-w-3xl mx-auto px-6 py-24 relative border-t border-gray-900/50">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">¿Tienes alguna pregunta?</h2>
            <p className="text-gray-400 text-lg">Resolvemos tus dudas más frecuentes de forma directa.</p>
          </div>
          
          <FaqAccordion />
        </section>

        {/* CTA Section */}
        <section id="cta" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-900/40 border border-gray-800 rounded-3xl md:rounded-[3rem] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-500/10 blur-[60px] md:blur-[80px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-600/10 blur-[60px] md:blur-[80px] rounded-full"></div>
            
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 relative z-10">Únete a la vanguardia</h2>
            <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto relative z-10">
              Estamos preparando la mejor plataforma para tu negocio. Contáctanos para ser de los primeros en enterarte del lanzamiento.
            </p>
            <Link 
              href="https://wa.me/584121315110?text=Hola,%20quisiera%20más%20información%20sobre%20simpleshop"
              target="_blank"
              className="inline-block bg-white text-black hover:bg-gray-200 px-10 py-5 rounded-full font-bold text-lg transition-all shadow-lg relative z-10"
            >
              Contactar al equipo
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}
