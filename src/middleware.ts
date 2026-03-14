import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export const config = {
  matcher: [
    "/((?!api|_next|_static|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Elimina el puerto si existe (ej., 'localhost:3000' -> 'localhost')
  const currentHost = hostname.split(':')[0];

  // Define el dominio base de nuestro SaaS (ej., 'misaas.com' o 'localhost')
  // Esto permite que la aplicación funcione correctamente en producción y desarrollo local
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';

  // Si es el dominio raíz o www.rootDomain, es la landing page.
  if (
    !currentHost || 
    currentHost === rootDomain || 
    currentHost === `www.${rootDomain}`
  ) {
    return NextResponse.next();
  }

  // Determina el ID del tenant (tienda)
  let tenantId = currentHost;

  console.log('--- Middleware Debug ---');
  console.log('currentHost:', currentHost);
  console.log('rootDomain:', rootDomain);

  // Si la petición es un subdominio de nuestro dominio raíz (ej., tienda.localhost o tienda.misaas.com)
  // extraemos solo el nombre del subdominio. De lo contrario, pasará el dominio personalizado completo (mitienda.com)
  if (currentHost.endsWith(`.${rootDomain}`)) {
    tenantId = currentHost.replace(`.${rootDomain}`, '');
  }

  console.log('tenantId:', tenantId);

  // Prepara la respuesta que vamos a modificar
  const path = url.pathname === "/" ? "" : url.pathname;
  const searchParams = url.search;

  // Rutas que son globales y no deben ser reescritas al tenant
  if (path.startsWith('/auth/callback')) {
    let response = NextResponse.next();
    response = await updateSession(req, response);
    return response;
  }

  const rewritePath = `/sites/${tenantId}${path}${searchParams}`;
  
  let response = NextResponse.rewrite(new URL(rewritePath, req.url));

  // Actualiza la sesión de Supabase si es necesario, hidratando las cookies.
  response = await updateSession(req, response);

  // Comprobación rápida en el Edge para rutas protegidas
  const isAuthRoute = url.pathname.startsWith('/admin') && !url.pathname.startsWith('/admin/login');
  if (isAuthRoute) {
    // Si después del updateSession seguimos sin token, mandamos a login
    const hasAuthCookie = req.cookies.getAll().some(c => c.name.includes('-auth-token'));
    if (!hasAuthCookie) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return response;
}
