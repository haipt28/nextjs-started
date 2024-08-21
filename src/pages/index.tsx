import { SeoPage } from "@/components/seo";
import * as React from "react";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <SeoPage title={"Trang chủ"} />
      <h1 className="text-[100px]">Nextjs started</h1>
      <a href="/components" className="text-emerald-500 font-semibold text-6xl">
        Componnents Page
      </a>
    </div>
  );
}
