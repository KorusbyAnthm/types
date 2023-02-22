export declare const BadgeMap: {
    readonly CREATED_ACCOUNT: {
        readonly name: "Account Creation";
        readonly description: "You created your account!";
        readonly obtainedBy: "Creating your account";
        readonly value: 100;
    };
    readonly CLOSE_LISTENER: {
        readonly name: "Close Listener";
        readonly description: "You're a close listener, huh?";
        readonly obtainedBy: "Making your first contribution to a song's lyrics";
        readonly value: 200;
    };
};
export type BadgeId = keyof typeof BadgeMap;
