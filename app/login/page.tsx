import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Login com Patreon - UO Babel",
  description:
    "Conecte sua conta do Patreon para acessar recursos premium do servidor UO Babel.",
};

export default function Page() {
  return <LoginClient />;
}
