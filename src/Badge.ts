export const BadgeMap = <const>{
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
export type BadgeId = keyof typeof BadgeMap;