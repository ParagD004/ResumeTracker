export {}

export type Roles = "admin" | "moderator";

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles;
        };
    }
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}