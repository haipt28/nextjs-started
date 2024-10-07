import { SeoPage } from "@/components/seo";
import Link from "next/link";
import * as React from "react";

export default function HomePage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <SeoPage title={"Trang chủ"} />
      <h1 className="text-[100px]">Nextjs started</h1>
      <Link
        href="/components"
        className="text-emerald-500 font-semibold text-6xl"
      >
        Componnents Page
      </Link>
    </div>
  );
}
