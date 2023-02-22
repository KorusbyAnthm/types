export const PublicSafeKeys = {
    User: <const>[
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
    Identifier: <const>[
        "id",
        "username"
    ]
};
export type PublicSafeKey = {[key in keyof typeof PublicSafeKeys]: typeof PublicSafeKeys[key][number]};

export const SelfSafeKeys = {
    User: <const>[
        ...PublicSafeKeys.User,
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
    Identifier: <const>[
        ...PublicSafeKeys.Identifier,
        "email",
        "phoneNumber",
        "history"
    ]
};
export type SelfSafeKey = {[key in keyof typeof SelfSafeKeys]: typeof SelfSafeKeys[key][number]};