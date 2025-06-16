import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";
import IronmanClient from "./IronmanClient";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Ironman Ranking - UO Babel",
  description:
    "Ranking dos sobreviventes mais habilidosos do modo Ironman no servidor UO Babel.",
};

export default function Page() {
  return <IronmanClient />;
}
