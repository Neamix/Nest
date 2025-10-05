export interface UserType {
    id: string
    first_name: string;
    last_name: string;
    token?: string;
    joined_via?: string;
    email: string;
    phone: string;
    country_code: string;
    email_verified_at: string | null;
    joined_at: string;
    avatar: string | null;
    device_token: string;
    password?: string;
} 

export type UserAuthStateType = {
    success: boolean;
    error?: Record<string, string | string[]>| null | string;
    data?: UserType | null;
};


export type RegisterCredentialsType  = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string,
    device_token?: string,
}

export type LoginActionResult = {
    success: boolean;
    error: Record<string, string> | null;
    data: UserAuthStateType | null;
};

export type UserLoginType = Pick<UserType, 'email' | 'password'>;
export type UserRegisterType = Pick<UserType, 'first_name' | 'last_name' | 'email' | 'phone' | 'country_code'> & { confirm_password: string | null };
export type UserStateType = UserType & { setUser: (userData: Partial<UserType>) => void; };
export type ForgetPasswordType = Pick<UserType, 'email'>;

