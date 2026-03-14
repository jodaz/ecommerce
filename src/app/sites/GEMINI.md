# GEMINI.md: SimpleShop - Multi-tenant E-commerce Platform

Este archivo sirve como contexto fundamental para todas las interacciones de IA dentro de este repositorio. **SimpleShop** es una plataforma SaaS de e-commerce diseñada para el mercado venezolano, permitiendo a negocios gestionar múltiples tiendas físicas y métodos de pago localizados (Zelle, Pago Móvil, etc.).

## 🏗️ Resumen del Proyecto
- **Propósito:** Catálogos de e-commerce de alto rendimiento con aislamiento por dominios/subdominios.
- **Público Objetivo:** Negocios en Venezuela que necesitan una presencia digital unificada con pagos localizados.
- **Arquitectura:** Multi-tenant basado en slugs (`/sites/[tenant]`). Los requests son reescritos por middleware.
- **Idioma Principal:** **Español 🇻🇪**. Todo el contenido orientado al usuario, mensajes de error y comentarios internos deben estar en español.

## 🛠️ Stack Tecnológico
- **Framework:** Next.js 16.1.1 (Turbopack habilitado, App Router).
- **Lenguaje:** TypeScript (Modo estricto).
- **Base de Datos/Auth:** Supabase (PostgreSQL).
- **Estilos:** Tailwind CSS 4.
- **Estado:** Zustand (con persistencia).
- **Formularios:** React Hook Form + Zod.
- **Iconos:** Lucide React.

## 📁 Estructura de Directorios Clave
- `src/app/sites/[tenant]/`: Lógica de página específica del tenant (Shopfront y Store Admin).
- `src/app/sites/[tenant]/admin/`: Dashboard administrativo para el dueño de la tienda.
- `src/app/api/`: Endpoints de backend. **Nota:** Los Client Components no deben consultar Supabase directamente.
- `src/lib/api/`: Funciones de servicio que encapsulan la lógica de negocio y DB.
- `src/features/`: Módulos de negocio (Inventario, Onboarding, etc.).
- `src/components/ui/`: Componentes de interfaz compartidos (ej: `PriceDisplay`).
- `supabase/migrations/`: Gestión del esquema de base de datos.

## 🎨 Convenciones de Diseño (MegaImport Aesthetic)
- **Tema:** Alto contraste, blanco y negro.
- **Tipografía:** Etiquetas en mayúsculas (UPPERCASE) con tracking (espaciado entre letras) acentuado.
- **Componentes:** Bordes `zinc-200`, fondos `white` o `zinc-50`.
- **Utilidades:** Uso mandatorio de `cn()` de `src/lib/utils.ts` para merging de clases Tailwind.

## 🚀 Comandos Útiles
- **Desarrollo:** `pnpm dev`
- **Build:** `pnpm build`
- **Linting:** `pnpm lint`
- **Type Checking:** `pnpm tsc`

## ⚠️ Reglas de Oro
1. **Seguridad:** Nunca expongas secretos o claves de API. Protege archivos `.env` y la carpeta `.git`.
2. **Multi-tenancy:** Siempre valida que los datos consultados pertenezcan al `business_id` del tenant actual.
3. **Backend-First:** Prefiere Server Components para el fetch de datos inicial.
4. **Localización:** Los precios deben poder mostrarse tanto en USD como en VES (usando tasas de cambio actualizadas, usualmente vía `akomo.xyz`).
5. **No staging/commit:** No realices `git add` ni `git commit` a menos que se te pida explícitamente.
