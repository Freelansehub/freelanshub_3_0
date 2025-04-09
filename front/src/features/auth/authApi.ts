import { ApiResponse, instance } from "../../store/configureApi";
import { RoleType } from "../user/userReducer";

export type AuthDataType = {
    token: string
}

export const AuthApi = {
    async reg(
        name: string,
        password: string,
        email: string,
        phone: string,
        role: RoleType
    ) {
        try {
            const response = await instance.post<ApiResponse<AuthDataType>>("auth/register", {
                name,
                password,
                email,
                phone,
                role,
            });

            return response.data
        } catch (error: unknown) {
            throw new Error('not request')
        }
    },

    async login(email: string, password: string) {
        try {
            console.log(email, password);
            const response = await instance.post<ApiResponse<AuthDataType>>("auth/login", {
                login: email,
                password
            });
            console.log("response", response.data);
            return response.data
        } catch (error: unknown) {
            throw new Error('not request')
        }
    }
}