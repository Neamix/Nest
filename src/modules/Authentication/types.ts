export interface UserLoginType {
    email: string,
    password?: string | null
}

export interface UserRegisterType extends UserLoginType {
    first_name: string,
    last_name: string,
    phone?: string,
    country_code?: string,
    confirm_password: string | null,
}

export interface RegisterErrorType {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
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
    setUser: (userData: Partial<UserStateType>) => void;
}

export interface UserAuthStateType {
    success: boolean;
    error?: Record<string, string | string[]>| null | string;
    data?: UserStateType | null;
}

export interface LoginCredentialsType {
    email: string,
    password: string,
    device_token: string,
}

export interface RegisterCredentialsType extends LoginCredentialsType {
    first_name: string,
    last_name?: string,
}