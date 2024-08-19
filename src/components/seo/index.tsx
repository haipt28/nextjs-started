import Head from "next/head";
export interface SeoPageProps {
  title: string;
  description?: string;
  imagePreview?: string;
  ogTitle?: string;
}

export function SeoPage(props: SeoPageProps) {
  const description = props?.description || "Nextjs Started";
  const image = props?.imagePreview || "/logo/logo.png";
  const ogTitle = props?.ogTitle || props?.title;

  return (
    <Head>
      <title>{props.title + " -  Nextjs Started"}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:title" content={ogTitle} />
      <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>
  );
}
