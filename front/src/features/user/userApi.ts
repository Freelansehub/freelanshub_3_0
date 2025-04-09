import { ApiResponse, instance } from "../../store/configureApi";
import { UserType } from "./userReducer";

export const UserApi = {
    async get() {
        try {
            const response = await instance.get<ApiResponse<UserType>>(`user`)
            return response.data;
        }
        catch (error) {
            console.log(error)
        }
    },

    async getCoursIds() {
        try {
            const response = await instance.get<ApiResponse<{ coursIds: string[] }>>(`user/coursIds`)

            return response.data;
        }
        catch (error) {
            console.log(error)
        }
    }
}