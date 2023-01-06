import countryData from 'country-data/';
import fs from "node:fs";
import path from "node:path";

const countryDataPath = path.join(__dirname, "./data/countryData.ts");

let countryBase = "export const CountryData = <const>";

countryBase += JSON.stringify(countryData.countries.all)

fs.existsSync(countryDataPath) && fs.unlinkSync(countryDataPath);
fs.appendFileSync(countryDataPath, countryBase, "utf-8");