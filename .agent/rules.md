# Reglas de Agente (Agent Rules)

Este archivo contiene las reglas y comportamientos obligatorios que los agentes de IA (como Gemini/Claude) deben seguir cuando interactúen con este repositorio.

## 1. Idioma Obligatorio: Español 🇻🇪
- **TODO el contenido generado que sea visible para el usuario final DEBE estar en Español.**
- Esto incluye:
  - Textos de la interfaz de usuario (UI), componentes de React, y descripciones.
  - Comentarios explicativos dentro de los archivos de configuración o código fuente (`// Esto hace X`).
  - Datos de prueba (mocks) o semillas de base de datos (seeds).
  - Nombres de rutas de cara al cliente o SEO (slugs), a menos que rompan convenciones de Next.js.
  - Respuestas de la interfaz de línea de comandos del agente cuando discuta estrategias sobre el proyecto.

## 2. Tecnologías y Estándares
- **Gestor de paquetes:** Usa **SIEMPRE** `pnpm` en lugar de `npm` o `yarn`.
- **Backend/DB:** Usa **Supabase** (`@supabase/supabase-js`, `@supabase/ssr`) con Row-Level Security (RLS) para el multitenancy. NO USAR Prisma.
- **Renderizado:** Prioriza React Server Components (RSC) y Server Actions de Next.js 15+ sobre los componentes de cliente.
- **Estilos:** Usa Tailwind CSS V4 + Vanilla CSS.

## 3. Multitenancy
- Nunca asumas un ID de tienda fijo. Todas las operaciones de datos de la tienda deben filtrar por la columna `store_id`, obteniendo primero el ID correcto resolviendo el subdominio (`[tenant]`) a través de `src/proxy.ts` -> `params.tenant`.