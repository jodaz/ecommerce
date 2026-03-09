import type { Metadata } from "next";
import { TenantLayoutClient } from "./TenantLayoutClient";

export const metadata: Metadata = {
  title: "simpleshop C.A.",
  description: "Catálogo de E-commerce Minimalista para simpleshop C.A.",
};

export default function TenantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TenantLayoutClient>{children}</TenantLayoutClient>;
}
