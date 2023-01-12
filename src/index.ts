import { CountryData } from './data/countryData';
import mimeDb from "mime-db/db.json";

export const MimeTypes = Object.keys(mimeDb) as MimeType[];
export type MimeType = keyof typeof mimeDb;

export const ISOLanguageCodes = [...CountryData].map(country => country.languages).flat();
export type ISOLanguageCode = typeof ISOLanguageCodes[number];

export const ISOCountryCodes = [...CountryData].map(country => [country.alpha2, country.alpha3]).flat();
export type ISOCountryCode = typeof ISOCountryCodes[number];

export const Services = <const>["google", "microsoft", "apple", "twitter", "github", "spotify", "youtube"];
export type Service = typeof Services[number];

export const ContributionTypes = <const>["LYRIC_ADDED", "LYRIC_REMOVED", "LYRIC_UPDATED", "LYRIC_TIMESTAMPED", "LYRIC_KARAOKED", "LYRIC_TRANSLATED"];
export type ContributionType = typeof ContributionTypes[number];

export const KeyArgs = <const>["C", "D", "E", "F", "G", "A", "B", "b", "#", "MAJOR", "MINOR", "DO", "RE", "MI", "FA", "SOL", "LA", "SI", "MAYOR", "MENOR", "SOSTENIDO"];
export type KeyArg = typeof KeyArgs[number];

export const Badges = <const>{
    CREATED_ACCOUNT: {
        name: "Account Creation",
        description: "You created your account!",
        obtainedBy: "Creating your account",
        value: 100
    },
    CLOSE_LISTENER: {
        name: "Close Listener",
        description: "You're a close listener, huh?",
        obtainedBy: "Making your first contribution to a song's lyrics",
        value: 200
    }
};
export type BadgeId = keyof typeof Badges;

export interface BasePostContentType {
    description?: string;
};

export interface PostContentTypeMap {
    video: BasePostContentType &{
        src: string;
        size: number;
        md5: string;
        contentType: MimeType;
    };
    image: BasePostContentType & {
        src: string;
        size: number;
        md5: string;
        contentType: MimeType;
    };
    snippet: {
        src: Schema.Snippet;
    };
    lyrics: {
        src: string;
        from: string;
    };
    song: {
        src: string;
        from: number;
        to: number;
        size: number;
        contentType: MimeType;
    };
    text: {
        src: string;
    };
};
export type PostContentType = keyof PostContentTypeMap;
export type PostContent = PostContentTypeMap[PostContentType];

// TODO: Turn into BaseType too
export type ContributionEventMap = {
    [contributionType in ContributionType]: {
        type: contributionType;
        contribution: Schema.Contribution;
        ipAddr: string;
        timestamp: number;
    };
};

export interface HistoryEventMap extends ContributionEventMap {
    ACCOUNT_CREATED: {
        ipAddr: string;
        timestamp: number;
    };
    TOKEN_CREATED: {
        ipAddr: string;
        timestamp: number;
    };
    ACCOUNT_UPDATED: {
        change: {
            property: string;
            from: any;
            to: any
        };
        ipAddr: string;
        timestamp: number
    };
    SEARCH: {
        query: string;
        ipAddr: string;
        timestamp: string;
    }
};
export type HistoryEvent = keyof HistoryEventMap;
export type HistoryItem = HistoryEventMap[HistoryEvent];


export const AccountTypes = <const>["artist", "admin", "user", "agency"];
export type AccountType = typeof AccountTypes[number];

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
        "favorites"
    ],
    Identifier: <const>[
        ...PublicSafeKeys.Identifier,
        "email",
        "phoneNumber",
        "history"
    ]
};
export type SelfSafeKey = {[key in keyof typeof SelfSafeKeys]: typeof SelfSafeKeys[key][number]};

export type LastEdited = {
    by: string;
    timestamp: number;
};

export namespace Schema {
    export interface Notification {
        icon?: string;
        banner?: string;
        link?: string;
        title: string;
        description: string;
        timestamp: number;
    };

    export interface Contribution {
        addr: string;
        type: ContributionType;
        diff: string;
        timestamp: number;
    };

    export interface Badge {
        type: BadgeId;
        value: number;
        timestamp: number;
    };

    export interface Post {
        slides: PostContent[];
        comments: Comment[];
        likes: Save[];
        favorites: Save[]
        timestamp: number;
    };

    export interface AccountLink {
        
    };

    export interface Save {
        from: string;
        timestamp: number;
    };

    export interface Comment {
        from: string;
        content: string;
        likes: Save[];
        replies?: Comment[];
        timestamp: number;
    };

    export interface Follow {

    };

    export interface Collection {
        name: string;
    };

    export interface User {
        // Identifiers / credentials
        id: string;
        username: string;
        email: string;
        phoneNumber?: string;

        // Password
        password: string;

        // Verifications
        emailVerified: boolean;
        phoneNumberVerified?: boolean;

        // Personal information
        name: string;
        bio?: string;
        created: number;
        birthDate: number;
        links: {[service in Service]?: AccountLink};
        
        // Biometrics
        pfp?: {
            src: string;
            md5: string;
            mimetype: MimeType;
        };

        // App data
        // User's notifications
        notifications: Notification[];

        // There properties contribute to the user's "popularity"
        badges: Badge[];
        score: number;
        relevance: number;

        // User's posts
        posts: Post[];

        // Similar to the favorites property except it's a single collection
        likes: Collection;

        // The user's interests (gathered from search queries, hashtags, likes and favorites)
        interests: string[];

        // Who the user's following and who follows the user
        followers: Follow[];
        following: Follow[];

        // An array of collections containing the user's favorited songs, snippets, posts, etc.
        favorites: Collection[];

        // User's contributions (accounts for: updating lyrics, timestamping, posting, etc.)
        contributions: Contribution[];

        // User's history records (accounts for: logins, account changes, posts, searches, etc.)
        // This is mostly done for security and preventon of brute-force attacks so they can be reported to authorities
        history: HistoryItem[];

        // Account type (each type has different abilities)
        accountType: AccountType;

        // Settings
        settings?: {
            privacy?: {
                showFollowers?: boolean,
                showFollowing?: boolean,
                showLikes?: boolean,
                privateAccount?: boolean,
                showScore?: boolean,
                showContributions?: boolean,
                linksShown?: Service[]
            };
        };
    };

    export interface Snippet {
        explicit: boolean;
        lang: ISOLanguageCode;
        keywords: string[];
        id: string;
        relevance: number;
        data: string;
        timestamp: number;
        creator: string;
        sources: {
            album: string;
            song: string;
            artists: string[];
            external: {[service in Service]?: string};
            from: number;
            to: number;
        };
        comments: Comment[];
        likes: Save[];
        favorites: Save[];
    };

    export interface Song {
        writtenBy: string[];
        singers: string[];
        id: string;
        about: {
            duration: number;
            bpm: number;
            key: KeyArg[];
            loudness: number;
            explicit: boolean;
            description: string;
            lastEdited: LastEdited
        };
        references: {
            lastEdited: LastEdited;
            lyrics: string[];
            about: string[];
        };
    };

    export namespace Public {
        export type User = {[key in PublicSafeKey["User"]]: Schema.User[key]};
    };
    
    export namespace Self {
        export type User = {[key in SelfSafeKey["User"]]: Schema.User[key]};
    };
};