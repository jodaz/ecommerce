# Guía de Docker para Desarrollo Local 🐳

Esta guía explica cómo ejecutar el proyecto de e-commerce utilizando Docker Compose para simular un entorno de producción localmente, incluyendo soporte para multitenencia.

## 📋 Requisitos Previos

- Docker y Docker Compose instalados.
- Permisos para editar el archivo de hosts de tu sistema.

## 🚀 Pasos para Iniciar

### 1. Configurar Variables de Entorno

Asegúrate de tener un archivo `.env` en la raíz del proyecto. Puedes basarte en [.env.docker.example](file:///home/jesus/projects/jodaz/ecommerce/.env.docker.example).

> [!IMPORTANT]
> Las variables `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` son necesarias tanto en la construcción como en la ejecución.

### 2. Configurar Dominios Locales

Para que la multitenencia funcione (subdominios), debes mapear los dominios en tu archivo `/etc/hosts` (Linux/macOS) o `C:\Windows\System32\drivers\etc\hosts` (Windows).

Añade las siguientes líneas:
```text
127.0.0.1 ecommerce.test
127.0.0.1 store1.ecommerce.test
127.0.0.1 store2.ecommerce.test
```

### 3. Iniciar en Modo Desarrollo (Hot Reload) ⚡

Para desarrollar con cambios en tiempo real, usa el archivo de configuración de desarrollo:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Esto hará lo siguiente:
- Montará tu carpeta actual dentro del contenedor.
- Ejecutará `pnpm dev`.
- **Cualquier cambio que hagas en el código se reflejará instantáneamente.**

La aplicación estará disponible en [http://ecommerce.test:3000](http://ecommerce.test:3000).

### 4. Iniciar en Modo Producción (Simulación) 🏗️

Si quieres probar la versión optimizada de producción:

```bash
docker compose up --build
```

La aplicación estará disponible en [http://ecommerce.test](http://ecommerce.test).

## 🛠️ Comandos Útiles

- **Detener servicios:** `docker compose down`
- **Ver logs:** `docker compose logs -f`
- **Limpiar imágenes antiguas:** `docker image prune`

## ❓ Resolución de Problemas

- **Error de "Host not found":** Asegúrate de que `NEXT_PUBLIC_ROOT_DOMAIN` en tu `.env` coincida con el dominio base en tu archivo de hosts (ej. `ecommerce.test`).
- **Puerto 80 ocupado:** Si ya tienes un servidor web corriendo, cambia el mapeo de puertos en [docker-compose.yml](file:///home/jesus/projects/jodaz/ecommerce/docker-compose.yml) (ej. `"8080:3000"`).
