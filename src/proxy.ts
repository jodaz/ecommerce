import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next|_static|[\\w-]+\\.\\w+).*)",
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Remove port if it exists (e.g., 'localhost:3000' -> 'localhost')
  const currentHost = hostname.split(':')[0];

  // Define the base domain of our SaaS (e.g., 'misaas.com' or 'localhost')
  // This allows the app to work seamlessly in production and local dev
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';

  // If it's the root domain or www.rootDomain, it's the landing page.
  if (
    !currentHost || 
    currentHost === rootDomain || 
    currentHost === `www.${rootDomain}`
  ) {
    return NextResponse.next();
  }

  // Determine the tenant ID
  let tenantId = currentHost;

  // If the request is a subdomain of our root domain (e.g., tienda.localhost or tienda.misaas.com)
  // extract just the subdomain name. Otherwise, it will pass the full custom domain (mitienda.com)
  if (currentHost.endsWith(`.${rootDomain}`)) {
    tenantId = currentHost.replace(`.${rootDomain}`, '');
  }

  // Build the rewrite URL path carefully
  const path = url.pathname === "/" ? "" : url.pathname;
  const rewritePath = `/sites/${tenantId}${path}`;

  return NextResponse.rewrite(new URL(rewritePath, req.url));
}
