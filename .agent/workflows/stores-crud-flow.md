---
description: Proceso completo para la implementación de una nueva funcionalidad CRUD con integración pública en SimpleShop.
---

Este workflow describe los pasos seguidos para implementar el CRUD de Sucursales (Stores), incluyendo la seguridad (RLS), la interfaz de usuario administrativa y la exposición de datos en el sitio público.

### 1. Definición del Esquema y Seguridad (RLS)
Antes de tocar el código, se debe asegurar que la base de datos permita las operaciones necesarias.
- Identificar la tabla objetivo (ej: `stores`).
- Crear una migración en `supabase/migrations/` para definir las políticas RLS.
- Permitir lectura pública (`SELECT`) si la información es requerida en el storefront.
- Restringir escritura (`INSERT`, `UPDATE`, `DELETE`) solo a roles autorizados (ej: `owner`).

### 2. Implementación de la API (Backend)
Crear las rutas de Next.js en `src/app/api/[feature]/`.
- **Ruta de Colección**: `GET` (listar con filtros) y `POST` (crear).
- **Ruta de Entidad**: `PUT` (actualizar) y `DELETE` (eliminar).
- **Validación**: Verificar siempre el rol del usuario (`profiles.role`) y la pertenencia del recurso al `business_id` actual.
- **Importante**: Asegurarse de usar `await params` en los handlers de ruta para compatibilidad con Next.js 15+.

### 3. Capa de Servicio (Client SDK)
Añadir las funciones de fetch en un archivo de cliente compartido (ej: `src/lib/api/inventory-client.ts`).
- `get[Entities]`, `create[Entity]`, `update[Entity]`, `delete[Entity]`.
- Manejar la comunicación asíncrona con los endpoints creados en el paso anterior.

### 4. Componentes UI Modulares
Seguir el patrón de diseño "MegaImport":
- **Tabla**: Crear un componente tabular para listar los datos, con acciones de editar y eliminar.
- **Modal**: Un diálogo para el formulario de creación/edición, validado idealmente con Zod y React Hook Form.
- **Ubicación**: `src/app/sites/[tenant]/admin/_components/[feature]/`.

### 5. Integración Administrativa y Refactorización
- Integrar los componentes en la página principal (ej: `settings/page.tsx`).
- **Refactorización por Secciones**: Si la lógica se vuelve compleja, crear un componente "Section" (ej: `StoresSection.tsx`) que encapsule toda la lógica de estado, carga y modales de esa funcionalidad específica.

### 6. Integración en el Sitio Público (Storefront)
- Crear una nueva página en `src/app/sites/[tenant]/[route]/page.tsx`.
- Implementar un servicio de fetching para Server Components en `src/lib/api/[feature].ts`.
- Diseñar componentes de visualización (ej: `LocationCard.tsx`) que sigan la estética de marca.
- Actualizar la navegación global en `Navbar.tsx` para incluir el enlace a la nueva funcionalidad.

### 7. Verificación de Calidad
- **Pruebas de Flujo**: Crear, editar, marcar como principal (si aplica) y eliminar una entidad, verificando los cambios en tiempo real.
- **Integridad**: Ejecutar `pnpm run build` para detectar errores de tipado o regresiones.
- **RLS Check**: Confirmar que usuarios no autorizados no puedan manipular los datos vía API.
