import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";
import CallbackClient from "./CallbackClient";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Callback do Patreon - UO Babel",
  description:
    "Processando autenticação do Patreon para liberar acesso no UO Babel.",
};

export default function Page() {
  return <CallbackClient />;
}
