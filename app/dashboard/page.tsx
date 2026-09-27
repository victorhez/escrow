import type { Metadata } from "next";
import { DashboardApp } from "@/components/DashboardApp";

export const metadata: Metadata = {
  title: "Dashboard — Escrow",
  description: "Live demo of the Escrow agent holding, reviewing, and releasing milestone funds.",
};

export default function DashboardPage() {
  return <DashboardApp />;
}
