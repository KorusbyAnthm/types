"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfSafeKeys = exports.PublicSafeKeys = void 0;
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
    User: [
        ...exports.PublicSafeKeys.User,
        "email",
        "emailVerified",
        "phoneNumber",
        "phoneNumberVerified",
        "notifications",
        "links",
        "likes",
        "favorites",
        "blockedUsers",
        "restrictedUsers"
    ],
    Identifier: [
        ...exports.PublicSafeKeys.Identifier,
        "email",
        "phoneNumber",
        "history"
    ]
};
//# sourceMappingURL=SafeKeys.js.map