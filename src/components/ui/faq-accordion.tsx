"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  { 
    q: "¿Qué es simpleshop y para qué sirve?", 
    a: "simpleshop es un sistema de gestión empresarial completo que te permite administrar ventas, inventario, clientes, gastos y finanzas desde una sola plataforma. Está diseñado para empresas que buscan digitalizar sus operaciones y tener un control total de su negocio en tiempo real." 
  },
  { 
    q: "¿Necesito conocimientos técnicos para usarlo?", 
    a: "No, simpleshop está diseñado para ser intuitivo y fácil de usar. La interfaz es simple y clara, con guías paso a paso para configurar tu empresa. Puedes comenzar a usarlo en menos de 5 minutos sin necesidad de conocimientos técnicos previos." 
  },
  { 
    q: "¿Puedo usar el sistema desde mi teléfono o tablet?", 
    a: "Sí, simpleshop es completamente responsive y funciona perfectamente en dispositivos móviles, tablets y computadoras. Puedes gestionar tu negocio desde cualquier lugar y en cualquier momento, con la misma funcionalidad en todos los dispositivos." 
  },
  { 
    q: "¿Los datos de mi negocio y clientes están seguros?", 
    a: "Absolutamente. Utilizamos encriptación de extremo a extremo y servidores seguros para proteger toda tu información. Realizamos respaldos automáticos diarios y nunca compartimos tus datos con terceros. Tu privacidad y seguridad son nuestra prioridad." 
  },
  { 
    q: "¿Ofrecen soporte técnico?", 
    a: "Sí, ofrecemos soporte técnico en español a través de múltiples canales: chat en vivo, email y WhatsApp. Nuestro equipo está disponible para ayudarte con cualquier duda o problema que puedas tener. También contamos con documentación completa y tutoriales en video." 
  },
  { 
    q: "¿Puedo usar mi propio dominio?", 
    a: "Sí, ofrecemos la opción de conectar o adquirir tu propio nombre de dominio personalizado para tu cuenta." 
  },
  { 
    q: "¿Puedo cancelar en cualquier momento?", 
    a: "Sí, sin compromisos a largo plazo. Puedes cancelar, mejorar o cambiar tu suscripción con un par de clics." 
  }
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleOpen(i)}
              className="w-full flex items-center justify-between p-6 font-semibold cursor-pointer text-lg hover:text-emerald-400 transition-colors text-left"
            >
              {faq.q}
              <span className={`transition-transform duration-300 ${isOpen ? "rotate-90 text-emerald-400" : "rotate-0 text-gray-500"}`}>
                <ChevronRight className="w-5 h-5" />
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"}`}
            >
              <div className="px-6 text-gray-400">
                {faq.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
