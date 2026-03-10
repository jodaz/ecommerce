import Link from "next/link";
import { ArrowLeft, Shield, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

export const metadata: Metadata = {
  title: "Política de Privacidad | simpleshop",
  description: "Tu privacidad es nuestra prioridad. Conoce cómo protegemos tus datos en simpleshop.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <PublicNavbar />

      <main className="flex-grow flex flex-col items-center px-6 py-12">
        <div className="w-full max-w-3xl bg-gray-900/50 border border-gray-800 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full"></div>
          
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <Shield size={40} className="text-emerald-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Política de Privacidad</h1>

          <div className="space-y-8 text-gray-400 leading-relaxed">
            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">1.</span> Introducción
              </h2>
              <p>
                En simpleshop (en adelante &quot;nosotros&quot;, &quot;nuestro&quot; o &quot;la empresa&quot;), valoramos y respetamos la privacidad de nuestros usuarios. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos la información personal que nos proporcionas al utilizar nuestra plataforma y nuestros servicios de e-commerce.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">2.</span> Información que recopilamos
              </h2>
              <p>Podemos recopilar los siguientes tipos de información:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li><strong className="text-gray-200">Datos personales:</strong> nombre, apellido, dirección de correo electrónico, número de teléfono y otra información que proporciones voluntariamente al registrar tu negocio.</li>
                <li><strong className="text-gray-200">Datos de navegación:</strong> dirección IP, tipo de navegador, dispositivo utilizado, páginas visitadas y tiempo de navegación.</li>
                <li><strong className="text-gray-200">Cookies:</strong> utilizamos cookies para mejorar tu experiencia y personalizar el contenido.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">3.</span> Finalidad del tratamiento de datos
              </h2>
              <p>Utilizamos la información recopilada con las siguientes finalidades:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Prestar los servicios solicitados y gestionar tu relación con nosotros como socio comercial.</li>
                <li>Mejorar la experiencia del usuario y optimizar el funcionamiento de la plataforma multi-tenant.</li>
                <li>Enviar comunicaciones informativas, promocionales o de atención al cliente relacionadas con tu cuenta.</li>
                <li>Cumplir con obligaciones legales y normativas en las jurisdicciones donde operamos.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">4.</span> Base legal para el tratamiento
              </h2>
              <p>El tratamiento de tus datos se realiza en base a:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Tu consentimiento explícito al aceptar esta política o al registrarte en nuestros servicios.</li>
                <li>La necesidad contractual para proporcionarte las herramientas de venta en línea solicitadas.</li>
                <li>El cumplimiento de obligaciones legales aplicables.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">5.</span> Compartición de información
              </h2>
              <p>No compartimos tus datos personales con terceros, salvo en los siguientes casos:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Proveedores de servicios que nos ayudan a operar el sitio (por ejemplo, hosting en la nube, analítica o pasarelas de pago), bajo acuerdos de confidencialidad.</li>
                <li>Cuando sea requerido por ley o autoridad competente.</li>
                <li>En caso de fusión, adquisición o cambio de control de la empresa, garantizando la protección de tus datos.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">6.</span> Seguridad de la información
              </h2>
              <p>
                Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos personales contra acceso no autorizado, pérdida o alteración. Utilizamos cifrado SSL y protocolos de seguridad modernos para garantizar que tu información y la de tus clientes esté segura.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">7.</span> Conservación de datos
              </h2>
              <p>
                Conservamos tus datos personales durante el tiempo necesario para cumplir con las finalidades descritas en esta política, salvo que la ley requiera un período mayor de conservación.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">8.</span> Derechos del usuario
              </h2>
              <p>Tienes derecho a:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Acceder a tus datos personales.</li>
                <li>Solicitar su rectificación o eliminación.</li>
                <li>Oponerte o limitar su tratamiento.</li>
                <li>Retirar tu consentimiento en cualquier momento.</li>
              </ul>
              <p className="mt-4">
                Para ejercer estos derechos, puedes escribirnos a <a href="mailto:jesus@jodaz.xyz" className="text-emerald-500 hover:text-emerald-400 transition-colors underline font-medium">jesus@jodaz.xyz</a>.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">9.</span> Enlaces a sitios de terceros
              </h2>
              <p>
                Nuestra plataforma permite la integración con servicios externos. No somos responsables del contenido ni de las políticas de privacidad de dichos sitios externos. Te recomendamos leer sus propias políticas antes de proporcionar información personal.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">10.</span> Cambios en esta política
              </h2>
              <p>
                Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento para adaptarla a nuevas funcionalidades o requisitos legales. Cualquier cambio será publicado en esta misma página.
              </p>
            </section>

            <div className="pt-10 mt-10 border-t border-gray-800">
              <p className="text-white font-bold mb-2">Contacto</p>
              <p>
                Si tienes preguntas sobre esta política o el manejo de tus datos, contáctanos en{" "}
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
