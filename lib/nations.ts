import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

// Registrazione della lingua inglese
countries.registerLocale(en);

/**
 * Trasforma un codice ISO in un'emoji (es: "JP" -> 🇯🇵)
 */
export function getFlagEmoji(isoCode: string) {
  if (!isoCode) return "";
  const codePoints = isoCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Ritorna il nome della nazione in inglese (es: "JP" -> "Japan")
 */
export function getCountryName(isoCode: string) {
  if (!isoCode) return "";
  return countries.getName(isoCode, "en") || isoCode;
}

/**
 * Utility per avere la lista completa in inglese per i futuri menu a tendina
 */
export function getCountryOptions() {
  const list = countries.getNames("en", { select: "official" });
  return Object.entries(list)
    .map(([code, name]) => ({
      value: code,
      label: `${getFlagEmoji(code)} ${name}`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Utility per avere la lista completa in inglese per i menu a tendina
 * (Senza emoji delle bandiere, ideale per i form formali)
 */
export function getCountryOptionsWithoutFlags() {
  const list = countries.getNames("en", { select: "official" });
  return Object.entries(list)
    .map(([code, name]) => ({
      value: code,
      label: name, // Usiamo solo il nome, senza chiamare getFlagEmoji
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}