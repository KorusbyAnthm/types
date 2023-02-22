"use strict";
// TODO: Split into different files
// please, i can't manage this.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.AccountTypes = exports.KeyArgs = exports.ContributionTypes = exports.Services = exports.SelfSafeKeys = exports.PublicSafeKeys = exports.BadgeMap = exports.ISOLanguageCodes = exports.ISOCountryCodes = void 0;
const CountryData_1 = require("./CountryData");
Object.defineProperty(exports, "ISOCountryCodes", { enumerable: true, get: function () { return CountryData_1.ISOCountryCodes; } });
Object.defineProperty(exports, "ISOLanguageCodes", { enumerable: true, get: function () { return CountryData_1.ISOLanguageCodes; } });
const Badge_1 = require("./Badge");
Object.defineProperty(exports, "BadgeMap", { enumerable: true, get: function () { return Badge_1.BadgeMap; } });
const SafeKeys_1 = require("./SafeKeys");
Object.defineProperty(exports, "PublicSafeKeys", { enumerable: true, get: function () { return SafeKeys_1.PublicSafeKeys; } });
Object.defineProperty(exports, "SelfSafeKeys", { enumerable: true, get: function () { return SafeKeys_1.SelfSafeKeys; } });
exports.Services = ["google", "microsoft", "apple", "twitter", "github", "spotify", "youtube", "genius"];
exports.ContributionTypes = ["LYRIC_ADDED", "LYRIC_REMOVED", "LYRIC_UPDATED", "LYRIC_TIMESTAMPED", "LYRIC_KARAOKED", "LYRIC_TRANSLATED"];
exports.KeyArgs = ["C", "D", "E", "F", "G", "A", "B", "b", "#", "MAJOR", "MINOR", "DO", "RE", "MI", "FA", "SOL", "LA", "SI", "MAYOR", "MENOR", "SOSTENIDO"];
;
;
;
exports.AccountTypes = ["artist", "admin", "user", "agency"];
var Schema;
(function (Schema) {
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
})(Schema = exports.Schema || (exports.Schema = {}));
;
//# sourceMappingURL=index.js.map