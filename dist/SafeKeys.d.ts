export declare const PublicSafeKeys: {
    User: readonly ["id", "username", "relevance", "birthDate", "created", "contributions", "score", "badges", "posts", "bio", "followers", "following"];
    Identifier: readonly ["id", "username"];
};
export type PublicSafeKey = {
    [key in keyof typeof PublicSafeKeys]: typeof PublicSafeKeys[key][number];
};
export declare const SelfSafeKeys: {
    User: readonly ["id", "username", "relevance", "birthDate", "created", "contributions", "score", "badges", "posts", "bio", "followers", "following", "email", "emailVerified", "phoneNumber", "phoneNumberVerified", "notifications", "links", "likes", "favorites", "blockedUsers", "restrictedUsers"];
    Identifier: readonly ["id", "username", "email", "phoneNumber", "history"];
};
export type SelfSafeKey = {
    [key in keyof typeof SelfSafeKeys]: typeof SelfSafeKeys[key][number];
};
