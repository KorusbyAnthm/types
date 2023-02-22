"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISOCountryCodes = exports.ISOLanguageCodes = void 0;
const countryData_1 = require("./data/countryData");
exports.ISOLanguageCodes = [...countryData_1.CountryData].map(country => country.languages).flat();
exports.ISOCountryCodes = [...countryData_1.CountryData].map(country => [country.alpha2, country.alpha3]).flat();
//# sourceMappingURL=CountryData.js.map