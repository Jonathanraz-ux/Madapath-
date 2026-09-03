"use client";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { services, slugs, type Lang, type ServiceSlug } from "@/lib/madapath";
export function Diagnostic({ lang, question, button, prefix }: { lang: Lang; question: string; button: string; prefix: string }) {
  const [choice, setChoice] = useState<ServiceSlug>("travailleur"); const [shown, setShown] = useState(false);
  return <div className="diag-form"><h3>{question}</h3><RadioGroup value={choice} onValueChange={(value) => { setChoice(value as ServiceSlug); setShown(false); }} className="choice-grid">{slugs.map((slug) => <label className="choice" key={slug} data-state={choice === slug ? "checked" : "unchecked"}><RadioGroupItem value={slug} aria-label={services[slug][lang].name} /><span>{services[slug][lang].name}</span></label>)}</RadioGroup><button className="button" style={{ marginTop: 18 }} onClick={() => setShown(true)}>{button}</button>{shown && <div className="diag-result"><strong>{prefix}</strong><br />{services[choice][lang].short}<br /><a className="more" href={`/${lang}/services/${choice}`}>→ {services[choice][lang].name}</a></div>}</div>;
}
