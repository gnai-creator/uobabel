import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Painel - UO Babel",
  description:
    "Gerencie seu acesso premium e vincule sua conta do Ultima Online no Painel do UO Babel.",
};

export default function Page() {
  return <ClientPage />;
}
