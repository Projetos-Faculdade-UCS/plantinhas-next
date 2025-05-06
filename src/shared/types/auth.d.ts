export interface GoogleUser {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    iat: int;
    exp: int;
}

export interface ProfilePreview {
    id: int;
    profile_picture: string;
    user: {
        id: int;
        email: string;
        username: string;
        first_name: string;
        last_name: string;
    };
}

export interface SessionToken {
    refresh: string;
    access: string;
    exp: int;
}

//export interface Profile extends ProfilePreview {}
