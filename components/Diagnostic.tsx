"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  services,
  slugs,
  WHATSAPP_LINK,
  type Lang,
  type ServiceSlug,
} from "@/lib/madapath";

export function Diagnostic({
  lang,
  question,
  button,
  prefix,
}: {
  lang: Lang;
  question: string;
  button: string;
  prefix: string;
}) {
  const [choice, setChoice] = useState<ServiceSlug>("travailleur");
  const [step, setStep] = useState<1 | 2>(1);

  const nextLabel = lang === "fr" ? "Mon parcours" : "My path";
  const editLabel = lang === "fr" ? "Modifier mon choix" : "Change my answer";
  const waLabel =
    lang === "fr" ? "Être rappelé via WhatsApp" : "Get a reply on WhatsApp";
  const waMsg =
    lang === "fr"
      ? `Bonjour MadaPath, je viens de faire le pré-diagnostic (projet : ${services[choice][lang].name}). J'aimerais être accompagné(e) pour cette démarche.`
      : `Hello MadaPath, I just completed the pre-diagnostic (goal: ${services[choice][lang].name}). I would like guidance for this process.`;

  return (
    <div className="diag-form">
      <div
        className="diag-steps"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={step === 1 ? 50 : 100}
      >
        <div className="diag-track">
          <span className={`diag-fill${step === 2 ? " done" : ""}`} />
        </div>
        <div className="diag-step-labels">
          <span className={step === 2 ? "done" : "on"}>
            <b>1</b>
            {lang === "fr" ? "Votre objectif" : "Your goal"}
          </span>
          <span className={step === 2 ? "on" : "off"}>
            <b>2</b>
            {nextLabel}
          </span>
        </div>
      </div>

      {step === 1 ? (
        <>
          <h3>{question}</h3>
          <RadioGroup
            value={choice}
            onValueChange={(value) => {
              setChoice(value as ServiceSlug);
            }}
            className="choice-grid"
          >
            {slugs.map((slug) => (
              <label
                className="choice"
                key={slug}
                data-state={choice === slug ? "checked" : "unchecked"}
              >
                <RadioGroupItem
                  value={slug}
                  aria-label={services[slug][lang].name}
                />
                <span>{services[slug][lang].name}</span>
              </label>
            ))}
          </RadioGroup>
          <div className="diag-actions">
            <button className="button diag-next" onClick={() => setStep(2)}>
              {button}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </>
      ) : (
        <div className="diag-result">
          <CheckCircle2 className="diag-result-ico" size={24} aria-hidden="true" />
          <strong>{prefix}</strong>
          <p>{services[choice][lang].short}</p>
          <a className="more" href={`/${lang}/services/${choice}`}>
            {services[choice][lang].name}
            <ChevronRight className="more-arrow" size={14} aria-hidden="true" />
          </a>
          <div className="diag-actions">
            <a
              className="button diag-wa"
              href={`${WHATSAPP_LINK}${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {waLabel}
            </a>
            <button type="button" className="diag-back" onClick={() => setStep(1)}>
              <ArrowLeft size={14} aria-hidden="true" />
              {editLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}