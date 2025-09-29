import { callApi } from "@/lib/callApi";

export const loginAction = async function ({ email,password,device_token,fn}: {
    email: string,
    password: string,
    device_token: string,
    fn: (value: string) => void
}) {
    const response = await callApi({
        endpoint: "authentication/login",
        method: "POST",
        data: {
            email,
            password,
            device_token
        }
    });
    
    if (!response.status) {
        fn("Login failed. Please try again.");
    }
}