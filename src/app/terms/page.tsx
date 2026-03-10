import Link from "next/link";
import { ArrowLeft, FileText, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

export const metadata: Metadata = {
  title: "Términos de Servicio | simpleshop",
  description: "Consulta los términos y condiciones de uso de simpleshop, la plataforma líder de e-commerce en Venezuela.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <PublicNavbar />

      <main className="flex-grow flex flex-col items-center px-6 py-12">
        <div className="w-full max-w-3xl bg-gray-900/50 border border-gray-800 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full"></div>
          
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <FileText size={40} className="text-emerald-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Términos de Servicio</h1>

          <div className="space-y-8 text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">1.</span> Aceptación de los Términos
              </h2>
              <p>
                Al acceder y utilizar la plataforma simpleshop, aceptas cumplir y estar sujeto a los siguientes Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no podrás utilizar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">2.</span> Descripción del Servicio
              </h2>
              <p>
                simpleshop proporciona una plataforma de e-commerce multi-tenant que permite a los negocios crear, gestionar y escalar sus tiendas en línea. Nuestros servicios incluyen herramientas de diseño, gestión de inventario, procesamiento de pagos y análisis de datos.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">3.</span> Registro y Cuentas
              </h2>
              <p>
                Para utilizar simpleshop, debes registrarte y crear una cuenta de negocio. Eres responsable de mantener la confidencialidad de tus credenciales y de todas las actividades que ocurran bajo tu cuenta. Debes proporcionarnos información veraz y actualizada en todo momento.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">4.</span> Planes y Pagos
              </h2>
              <p>
                Ofrecemos diferentes planes de suscripción (Emprendedor, Profesional, etc.). Al elegir un plan, aceptas pagar las tarifas correspondientes de forma recurrente. Nos reservamos el derecho de modificar nuestros precios con previo aviso de 30 días.
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Los pagos se procesan a través de proveedores externos seguros.</li>
                <li>Las suscripciones se renuevan automáticamente a menos que se cancelen antes del fin del ciclo de facturación.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">5.</span> Uso Aceptable
              </h2>
              <p>
                Te comprometes a no utilizar simpleshop para actividades ilícitas, fraudulentas o que infrinjan los derechos de terceros. Está prohibido:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Vender productos ilegales o regulados sin los permisos correspondientes.</li>
                <li>Intentar vulnerar la seguridad de la plataforma.</li>
                <li>Hacer uso indebido de las APIs o recursos del sistema.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">6.</span> Propiedad Intelectual
              </h2>
              <p>
                simpleshop conserva todos los derechos sobre la plataforma, tecnología y marca. Tú conservas todos los derechos sobre el contenido que subas a tu tienda (imágenes, descripciones de productos, etc.), pero nos otorgas una licencia limitada para mostrar dicho contenido con el fin de prestar el servicio.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">7.</span> Cancelación y Terminación
              </h2>
              <p>
                Puedes cancelar tu suscripción en cualquier momento desde el panel de control. Tras la cancelación, seguirás teniendo acceso hasta el final del período pagado. Nos reservamos el derecho de suspender cuentas que incumplan estos términos.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">8.</span> Limitación de Responsabilidad
              </h2>
              <p>
                simpleshop se proporciona &quot;tal cual&quot; y &quot;según disponibilidad&quot;. No garantizamos que el servicio sea ininterrumpido o libre de errores. En ningún caso seremos responsables por daños indirectos, pérdida de beneficios o datos resultantes del uso de nuestra plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">9.</span> Ley Aplicable
              </h2>
              <p>
                Estos términos se rigen por las leyes vigentes en la jurisdicción donde se encuentra registrada la empresa principal operadora de simpleshop.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">10.</span> Modificaciones
              </h2>
              <p>
                Podemos actualizar estos Términos de Servicio ocasionalmente. Te notificaremos sobre cambios significativos a través de tu correo electrónico registrado o mediante avisos en la plataforma.
              </p>
            </section>

            <div className="pt-10 mt-10 border-t border-gray-800">
              <p className="text-white font-bold mb-2">Dudas sobre los Términos</p>
              <p>
                Si tienes alguna pregunta sobre estos términos, por favor contáctanos en{" "}
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

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}
