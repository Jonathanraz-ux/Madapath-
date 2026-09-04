export type Currency = "EUR" | "MGA" | "USD";

export interface ExchangeRates {
  EUR_MGA: number;
  EUR_USD: number;
  updatedAt: string;
}

export const FALLBACK_RATES: ExchangeRates = {
  EUR_MGA: 4931.62,
  EUR_USD: 1.14,
  updatedAt: "2026-09-04",
};

export const SERVICE_FEES_EUR: Record<string, number> = {
  visa_transformable: 200,
  regroupement_familial_base: 450,
  regroupement_familial_extra: 200,
  visa_investisseur: 650,
};

export function convertPrice(eurAmount: number, currency: Currency, rates: ExchangeRates): string {
  if (currency === "EUR") return `${eurAmount} €`;
  if (currency === "USD") {
    const usd = Math.round(eurAmount / rates.EUR_USD);
    return `${usd.toLocaleString("en-US")} USD`;
  }
  const mga = Math.round(eurAmount * rates.EUR_MGA);
  return `${mga.toLocaleString("fr-MG")} Ar`;
}

export function convertPriceNumeric(eurAmount: number, currency: Currency, rates: ExchangeRates): number {
  if (currency === "EUR") return eurAmount;
  if (currency === "USD") return Math.round(eurAmount / rates.EUR_USD);
  return Math.round(eurAmount * rates.EUR_MGA);
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: "€",
  MGA: "Ar",
  USD: "USD",
};
