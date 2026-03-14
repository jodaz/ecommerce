---
description: Reinicio total de la base de datos remota en Supabase (Limpiar, Migrar y Sembrar)
---

Este workflow describe el proceso para vaciar completamente la base de datos remota en Supabase, aplicar todas las migraciones locales en orden y cargar los datos de semilla (seeds).

### Requisitos Previos
- Acceso al `supabase-mcp-server`.
- Identificar el `project_id` del proyecto (ej. `fvknqjhganrfpedkspvg`).

### Flujo de Ejecución

1. **Vaciado de Schema Público**
   Ejecutar el siguiente comando SQL mediante `execute_sql` para eliminar y recrear el esquema `public`, eliminando todas las tablas, funciones y tipos previos:
   ```sql
   DROP SCHEMA public CASCADE;
   CREATE SCHEMA public;
   GRANT ALL ON SCHEMA public TO postgres;
   GRANT ALL ON SCHEMA public TO anon;
   GRANT ALL ON SCHEMA public TO authenticated;
   GRANT ALL ON SCHEMA public TO service_role;
   ```

2. **Aplicación de Migraciones**
   Listar los archivos en `supabase/migrations/` y aplicarlos uno a uno en orden cronológico usando la herramienta `apply_migration`. Es fundamental respetar el orden indicado por el timestamp en el nombre del archivo.

3. **Carga de Datos Iniciales (Seed)**
   Ejecutar el contenido de los archivos de semilla en el siguiente orden usando `execute_sql`:
   1. `supabase/seed.sql`: Crea los usuarios base y la estructura inicial de negocios.
   2. `supabase/seed_demo.sql`: Crea datos de ejemplo para pruebas de interfaz.

   > [!IMPORTANT]
   > Validar que los UUIDs en los archivos SQL sean válidos (hexadecimal). Evitar el uso de caracteres como 's' en UUIDs manuales.

4. **Verificación**
   Listar las tablas del esquema `public` con `list_tables` para asegurar que la estructura se ha recreado correctamente y realizar un conteo de registros en la tabla `businesses`.
