import firebase from "firebase-admin";
import { ISOCountryCode, ISOLanguageCode, ISOCountryCodes, ISOLanguageCodes } from './CountryData';
export { ISOCountryCode, ISOLanguageCode, ISOCountryCodes, ISOLanguageCodes };
import { BadgeMap, BadgeId } from "./Badge";
export { BadgeMap, BadgeId };
import { PublicSafeKey, PublicSafeKeys, SelfSafeKey, SelfSafeKeys } from "./SafeKeys";
export { PublicSafeKey, PublicSafeKeys, SelfSafeKey, SelfSafeKeys };
export declare const Services: readonly ["google", "microsoft", "apple", "twitter", "github", "spotify", "youtube", "genius"];
export type Service = typeof Services[number];
export declare const ContributionTypes: readonly ["LYRIC_ADDED", "LYRIC_REMOVED", "LYRIC_UPDATED", "LYRIC_TIMESTAMPED", "LYRIC_KARAOKED", "LYRIC_TRANSLATED"];
export type ContributionType = typeof ContributionTypes[number];
export declare const KeyArgs: readonly ["C", "D", "E", "F", "G", "A", "B", "b", "#", "MAJOR", "MINOR", "DO", "RE", "MI", "FA", "SOL", "LA", "SI", "MAYOR", "MENOR", "SOSTENIDO"];
export type KeyArg = typeof KeyArgs[number];
export interface BasePostContentType {
    description?: string;
}
export interface PostContentTypeMap {
    video: BasePostContentType & {
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
}
export type PostContentType = keyof PostContentTypeMap;
export type PostContent = PostContentTypeMap[PostContentType];
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
            to: any;
        };
        ipAddr: string;
        timestamp: number;
    };
    SEARCH: {
        query: string;
        ipAddr: string;
        timestamp: string;
    };
}
export type HistoryEvent = keyof HistoryEventMap;
export type HistoryItem = HistoryEventMap[HistoryEvent];
export declare const AccountTypes: readonly ["artist", "admin", "user", "agency"];
export type AccountType = typeof AccountTypes[number];
export type LastEdited = {
    by: string;
    timestamp: number;
};
export type AllOpt<T> = {
    [key in keyof T]?: T[key];
};
export declare namespace Schema {
    interface Notification {
        icon?: string;
        banner?: string;
        link?: string;
        title: string;
        description: string;
        timestamp: number;
    }
    interface Contribution {
        addr: string;
        type: ContributionType;
        diff: string;
        timestamp: number;
    }
    interface Badge {
        type: BadgeId;
        value: number;
        timestamp: number;
    }
    interface Post {
        slides: PostContent[];
        comments: Comment[];
        likes: Save[];
        favorites: Save[];
        timestamp: number;
    }
    interface AccountLink {
    }
    interface Save {
        from: string;
        timestamp: number;
    }
    interface Comment {
        from: string;
        content: string;
        likes: Save[];
        replies?: Comment[];
        timestamp: number;
    }
    interface Follow {
    }
    interface Collection {
        name: string;
    }
    interface User {
        id: string;
        username: string;
        email: string;
        phoneNumber?: string;
        password: string;
        emailVerified: boolean;
        phoneNumberVerified?: boolean;
        name: string;
        bio?: string;
        created: number;
        birthDate: number;
        links: {
            [service in Service]?: AccountLink;
        };
        pfp?: {
            src: string;
            md5: string;
            mimetype: MimeType;
        };
        notifications: Notification[];
        badges: Badge[];
        score: number;
        relevance: number;
        posts: Post[];
        likes: Collection;
        interests: string[];
        followers: Follow[];
        following: Follow[];
        favorites: Collection[];
        contributions: Contribution[];
        history: HistoryItem[];
        accountType: AccountType;
        settings?: {
            privacy?: {
                showFollowers?: boolean;
                showFollowing?: boolean;
                showLikes?: boolean;
                privateAccount?: boolean;
                showScore?: boolean;
                showContributions?: boolean;
                linksShown?: Service[];
            };
        };
        blockedUsers: string[];
        restrictedUsers: string[];
    }
    interface Snippet {
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
            external: {
                [service in Service]?: string;
            };
            from: number;
            to: number;
        };
        comments: Comment[];
        likes: Save[];
        favorites: Save[];
    }
    interface Artist<isDb extends boolean = false> extends User {
        external?: {
            [service in Service]?: {
                id?: string;
                uri?: string;
                href?: string;
                url?: string;
            };
        };
        accountType: "artist";
        claimed: boolean;
        albums?: (isDb extends true ? firebase.firestore.DocumentReference<Album<isDb>> : Album<isDb>)[];
    }
    interface Album<isDb extends boolean = false> {
        id: string;
        artists: (isDb extends true ? firebase.firestore.DocumentReference<Artist<isDb>> : Artist<isDb>)[];
        songs: (isDb extends true ? firebase.firestore.DocumentReference<Song<isDb>> : Song<isDb>)[];
        external?: {
            [service in Service]?: {
                id?: string;
                uri?: string;
                href?: string;
                url?: string;
            };
        };
        images?: {
            x64?: string;
            x300?: string;
            x640?: string;
        };
        name: string;
        release: number;
        tracks: number;
        type: "album" | "single" | "compilation";
    }
    interface Song<isDb extends boolean = false> {
        id: string;
        name: string;
        duration: number;
        relevance: number;
        preview?: string;
        songNumber?: number;
        images?: {
            x64?: string;
            x300?: string;
            x640?: string;
        };
        release?: number;
        external?: {
            [service in Service]?: {
                id?: string;
                uri?: string;
                href?: string;
                url?: string;
            };
        };
        lyrics?: {
            original?: string;
        } & {
            [lang in ISOLanguageCode]?: string;
        };
        artists: (isDb extends true ? firebase.firestore.DocumentReference<Artist<isDb>> : Artist<isDb>)[];
        album: isDb extends true ? firebase.firestore.DocumentReference<Album<isDb>> : Album<isDb>;
    }
    namespace Public {
        type User = {
            [key in PublicSafeKey["User"]]: Schema.User[key];
        };
    }
    namespace Self {
        type User = {
            [key in SelfSafeKey["User"]]: Schema.User[key];
        };
    }
    namespace Opt {
        type User = AllOpt<Schema.User>;
    }
}
