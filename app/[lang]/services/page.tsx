import { notFound, redirect } from "next/navigation";

export default async function ServicesIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "fr" && lang !== "en") notFound();
  redirect(`/${lang}#services`);
}
