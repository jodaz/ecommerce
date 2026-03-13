import type { Metadata } from "next";
import { TenantLayoutClient } from "./TenantLayoutClient";
import { getBusinessBySlug } from "@/lib/api/business";
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

  return <TenantLayoutClient business={business as any}>{children}</TenantLayoutClient>;
}
