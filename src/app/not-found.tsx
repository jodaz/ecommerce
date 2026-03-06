"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Abstract Background Design */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-100 dark:bg-gray-900 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '3s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-50 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDuration: '4s' }}></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
        {/* Animated 404 text */}
        <h1 className="text-[10rem] md:text-[15rem] font-bold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-500 dark:from-white dark:to-gray-600 select-none">
          404
        </h1>
        
        {/* Creative Copy - Strict Spanish */}
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight mt-4 mb-6">
          Esta tienda no existe
        </h2>
        
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-lg mx-auto">
          Parece que te has perdido en el almacén. La tienda que buscas no es válida, ha sido movida o simplemente nunca existió.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link 
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-black dark:text-black dark:bg-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white dark:bg-black rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left transition-transform group-hover:-translate-x-1"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Volver al inicio
            </span>
          </Link>
          
          <button 
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-black dark:text-white bg-transparent border border-black/20 dark:border-white/20 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            onClick={() => router.back()}
          >
            Regresar a la página anterior
          </button>
        </div>
      </div>
      
      {/* Decorative floating elements simulating missing packages */}
      <div className="absolute pointer-events-none top-20 left-10 text-gray-200 dark:text-gray-800 opacity-50 animate-bounce text-4xl select-none" style={{ animationDuration: '3s' }}>📦</div>
      <div className="absolute pointer-events-none bottom-40 right-20 text-gray-200 dark:text-gray-800 opacity-50 animate-bounce text-5xl select-none" style={{ animationDuration: '2s' }}>🛒</div>
      <div className="absolute pointer-events-none top-1/3 right-10 text-gray-200 dark:text-gray-800 opacity-50 animate-pulse text-3xl select-none" style={{ animationDuration: '4s' }}>🏷️</div>
      <div className="absolute pointer-events-none bottom-32 left-32 text-gray-200 dark:text-gray-800 opacity-50 animate-pulse text-4xl select-none" style={{ animationDuration: '2.5s' }}>📪</div>
    </div>
  );
}
