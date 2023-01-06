"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Schema = exports.SelfSafeKeys = exports.PublicSafeKeys = exports.PostTypes = exports.BadgeTypes = exports.ContributionTypes = exports.Services = exports.ISOCountryCodes = exports.ISOLanguageCodes = exports.MimeTypes = void 0;
var countryData_1 = require("./data/countryData");
var db_json_1 = __importDefault(require("mime-db/db.json"));
exports.MimeTypes = Object.keys(db_json_1["default"]);
exports.ISOLanguageCodes = __spreadArray([], __read(countryData_1.CountryData), false).map(function (country) { return country.languages; }).flat();
exports.ISOCountryCodes = __spreadArray([], __read(countryData_1.CountryData), false).map(function (country) { return [country.alpha2, country.alpha3]; }).flat();
exports.Services = ["google", "microsoft", "apple", "twitter", "github", "spotify", "youtube"];
exports.ContributionTypes = ["LYRIC_ADDED", "LYRIC_REMOVED", "LYRIC_UPDATED", "LYRIC_TIMESTAMPED", "LYRIC_KARAOKED", "LYRIC_TRANSLATED"];
exports.BadgeTypes = ["CREATED_ACCOUNT", "CLOSE_LISTENER"];
exports.PostTypes = ["VIDEO", "IMAGE", "SNIPPET", "LYRICS", "SONG", "TEXT"];
exports.PublicSafeKeys = {
    User: [
        "id",
        "username",
        "relevance",
        "birthDate",
        "created",
        "contributions",
        "score",
        "badges",
        "posts",
        "bio",
        "followers",
        "following"
    ],
    Identifier: [
        "id",
        "username"
    ]
};
exports.SelfSafeKeys = {
    User: __spreadArray(__spreadArray([], __read(exports.PublicSafeKeys.User), false), [
        "email",
        "emailVerified",
        "phoneNumber",
        "phoneNumberVerified",
        "notifications",
        "links",
        "likes",
        "favorites"
    ], false),
    Identifier: __spreadArray(__spreadArray([], __read(exports.PublicSafeKeys.Identifier), false), [
        "email"
    ], false)
};
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
})(Schema = exports.Schema || (exports.Schema = {}));
;
//# sourceMappingURL=index.js.map