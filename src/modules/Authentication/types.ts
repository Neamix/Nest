export interface UserLoginType {
    email: string,
    password?: string | null
}


export interface UserStateType extends UserLoginType {
    first_name: string;
    last_name: string;
    phone: string;
    country_code: string;
    email_verified_at: string | null;
    joined_at: string;
    token: string;
    avatar: string | null;
}