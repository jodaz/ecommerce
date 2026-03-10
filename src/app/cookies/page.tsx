import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";
import { Metadata } from "next";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

export const metadata: Metadata = {
  title: "Política de Cookies | simpleshop",
  description: "Conoce cómo utilizamos las cookies en simpleshop para mejorar tu experiencia.",
};

export default function CookiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white font-sans selection:bg-emerald-500/30">
      <PublicNavbar />

      <main className="flex-grow flex flex-col items-center px-6 py-12">
        <div className="w-full max-w-3xl bg-gray-900/50 border border-gray-800 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full"></div>
          
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <Cookie size={40} className="text-emerald-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Política de Cookies</h1>

          <div className="space-y-8 text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">1.</span> ¿Qué son las cookies?
              </h2>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web que visitas envían a tu navegador y que se almacenan en el disco duro de tu ordenador o dispositivo móvil. Su objetivo es que el sitio web sea capaz de recordar información sobre tu visita, como tu idioma preferido y otros ajustes, para facilitar tu próxima visita y hacer que el sitio te resulte más útil.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">2.</span> ¿Cómo utilizamos las cookies?
              </h2>
              <p>
                En <strong>simpleshop</strong> utilizamos cookies para mejorar el funcionamiento técnico de nuestra plataforma, garantizar la seguridad de tu navegación y analizar cómo interactúas con nuestro sitio web para ofrecerte una experiencia más fluida y personalizada.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">3.</span> Cookies de Terceros (Google Analytics)
              </h2>
              <p>
                Utilizamos <strong>Google Analytics</strong>, un servicio de analítica web prestado por Google, Inc. Google Analytics utiliza cookies para ayudarnos a analizar cómo los usuarios utilizan nuestro sitio. La información generada por la cookie acerca de tu uso del sitio (incluyendo tu dirección IP) será directamente transmitida y archivada por Google en sus servidores.
              </p>
              <p className="mt-4">
                Google utiliza esta información por cuenta nuestra con el propósito de seguir la pista de tu uso del sitio, recopilando informes de la actividad de la página y prestando otros servicios relacionados con la actividad del sitio y el uso de Internet.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">4.</span> Gestión y desactivación de cookies
              </h2>
              <p>
                Como usuario, tienes la posibilidad de ejercer tu derecho de bloquear, eliminar o rechazar el uso de cookies en cualquier momento. Puedes hacerlo ajustando la configuración de tu navegador. A continuación, te facilitamos enlaces a las páginas de ayuda de los principales navegadores:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">Microsoft Edge</a></li>
              </ul>
              <p className="mt-4">
                Ten en cuenta que si decides bloquear o eliminar las cookies, es posible que no podamos ofrecerte la mejor experiencia de usuario y algunas funciones de la plataforma podrían verse afectadas.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">5.</span> Actualizaciones de esta política
              </h2>
              <p>
                Es posible que actualicemos la Política de Cookies de nuestro Sitio Web, por ello te recomendamos revisar esta política cada vez que accedas a nuestro Sitio Web con el objetivo de estar adecuadamente informado sobre cómo y para qué usamos las cookies.
              </p>
            </section>

            <div className="pt-10 mt-10 border-t border-gray-800">
              <p className="text-white font-bold mb-2">Contacto</p>
              <p>
                Si tienes alguna duda sobre nuestra Política de Cookies, puedes contactarnos en{" "}
                <a href="mailto:jesus@jodaz.xyz" className="text-emerald-500 hover:text-emerald-400 transition-colors font-medium underline">
                  jesus@jodaz.xyz
                </a>.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Link 
          href="/"
          className="group flex items-center gap-2 text-gray-400 hover:text-emerald-500 transition-colors font-semibold text-lg"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" /> 
          Volver al inicio
        </Link>
      </main>

      <PublicFooter />
    </div>
  );
}
