"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var country_data_1 = __importDefault(require("country-data/"));
var node_fs_1 = __importDefault(require("node:fs"));
var node_path_1 = __importDefault(require("node:path"));
var countryDataPath = node_path_1["default"].join(__dirname, "./data/countryData.ts");
var countryBase = "export const CountryData = <const>";
countryBase += JSON.stringify(country_data_1["default"].countries.all);
node_fs_1["default"].existsSync(countryDataPath) && node_fs_1["default"].unlinkSync(countryDataPath);
node_fs_1["default"].appendFileSync(countryDataPath, countryBase, "utf-8");
//# sourceMappingURL=makeConstant.js.map