import { CountryData } from "./data/countryData";

export const ISOLanguageCodes = [...CountryData].map(country => country.languages).flat();
export type ISOLanguageCode = typeof ISOLanguageCodes[number];

export const ISOCountryCodes = [...CountryData].map(country => [country.alpha2, country.alpha3]).flat();
export type ISOCountryCode = typeof ISOCountryCodes[number];