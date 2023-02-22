// TODO: Split into different files
// please, i can't manage this.

import firebase from "firebase-admin";

import { ISOCountryCode, ISOLanguageCode, ISOCountryCodes, ISOLanguageCodes } from './CountryData';
export { ISOCountryCode, ISOLanguageCode, ISOCountryCodes, ISOLanguageCodes };

import { BadgeMap, BadgeId } from "./Badge";
export { BadgeMap, BadgeId };

import { PublicSafeKey, PublicSafeKeys, SelfSafeKey, SelfSafeKeys } from "./SafeKeys";
export { PublicSafeKey, PublicSafeKeys, SelfSafeKey, SelfSafeKeys };

export const Services = <const>["google", "microsoft", "apple", "twitter", "github", "spotify", "youtube", "genius"];
export type Service = typeof Services[number];

export const ContributionTypes = <const>["LYRIC_ADDED", "LYRIC_REMOVED", "LYRIC_UPDATED", "LYRIC_TIMESTAMPED", "LYRIC_KARAOKED", "LYRIC_TRANSLATED"];
export type ContributionType = typeof ContributionTypes[number];

export const KeyArgs = <const>["C", "D", "E", "F", "G", "A", "B", "b", "#", "MAJOR", "MINOR", "DO", "RE", "MI", "FA", "SOL", "LA", "SI", "MAYOR", "MENOR", "SOSTENIDO"];
export type KeyArg = typeof KeyArgs[number];

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

export type LastEdited = {
    by: string;
    timestamp: number;
};

export type AllOpt<T> = {[key in keyof T]?: T[key]};

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

        blockedUsers: string[];
        restrictedUsers: string[];
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

    export interface Artist<isDb extends boolean = false> extends User {
        external?: {[service in Service]?: {
            id?: string;
            uri?: string;
            href?: string;
            url?: string;
        }};
        accountType: "artist";
        claimed: boolean;
        albums?: (isDb extends true ? firebase.firestore.DocumentReference<Album<isDb>> : Album<isDb>)[];
    };

    export interface Album<isDb extends boolean = false> {
        id: string;
        artists: (isDb extends true ? firebase.firestore.DocumentReference<Artist<isDb>> : Artist<isDb>)[];
        songs: (isDb extends true ? firebase.firestore.DocumentReference<Song<isDb>> : Song<isDb>)[];
        external?: {[service in Service]?: {
            id?: string;
            uri?: string;
            href?: string;
            url?: string;
        }};
        images?: {
            x64?: string;
            x300?: string;
            x640?: string;
        };
        name: string;
        release: number;
        tracks: number;
        type: "album" | "single" | "compilation";
    };

    export interface Song<isDb extends boolean = false> {
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
        external?: {[service in Service]?: {
            id?: string;
            uri?: string;
            href?: string;
            url?: string;
        }};
        lyrics?: {original?: string} & {[lang in ISOLanguageCode]?: string};
        artists: (isDb extends true ? firebase.firestore.DocumentReference<Artist<isDb>> : Artist<isDb>)[];
        album: isDb extends true ? firebase.firestore.DocumentReference<Album<isDb>> : Album<isDb>;
    };

    export namespace Public {
        export type User = {[key in PublicSafeKey["User"]]: Schema.User[key]};
    };
    
    export namespace Self {
        export type User = {[key in SelfSafeKey["User"]]: Schema.User[key]};
    };

    export namespace Opt {
        export type User = AllOpt<Schema.User>;
    };
};