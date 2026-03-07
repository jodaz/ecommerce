import Link from "next/link";
import { ArrowLeft, Shield, ChevronRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | simpleshop",
  description: "Tu privacidad es nuestra prioridad. Conoce cómo protegemos tus datos en simpleshop.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-tight text-white">simple<span className="text-emerald-500">shop</span></span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/#features" className="hover:text-white transition-colors">Características</Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">Precios</Link>
          <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/#pricing" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          >
            Ver Planes
          </Link>
        </div>
      </nav>

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
              <li><Link href="/#features" className="hover:text-emerald-400 transition-colors">Características</Link></li>
              <li><Link href="/#pricing" className="hover:text-emerald-400 transition-colors">Precios</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Soporte</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              <li><Link href="/#faq" className="hover:text-emerald-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Términos de Servicio</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors underline">Política de Privacidad</Link></li>
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
