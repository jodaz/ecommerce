import type { Metadata } from "next";
import { TenantLayoutClient } from "./TenantLayoutClient";
import { getBusinessBySlug } from "@/lib/api/business";
import { getExchangeRates } from "@/lib/currency";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ tenant: string }> }): Promise<Metadata> {
  const { tenant } = await params;
  const business = await getBusinessBySlug(tenant);
  if (!business) return { title: "Not Found" };
  
  return {
    title: `${business.name} | Catálogo`,
    description: business.business_settings?.description || `Catálogo de E-commerce para ${business.name}`,
  };
}

export default async function TenantLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ tenant: string }>
}>) {
  const { tenant } = await params;
  const business = await getBusinessBySlug(tenant);

  if (!business) {
    notFound();
  }

  const rates = await getExchangeRates();
  const usdRate = rates?.USD || 1;

  return (
    <TenantLayoutClient 
      business={{
        id: business.id,
        name: business.name,
        slug: business.slug,
        logo_url: business.logo_url || undefined
      }} 
      usdRate={usdRate}
    >
      {children}
    </TenantLayoutClient>
  );
}
