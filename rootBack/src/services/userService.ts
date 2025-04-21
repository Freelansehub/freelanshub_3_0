import { Response,Request } from "express"
import userReposytory from "../repositories/userReposytory"

class userService {
    async getUserById(userId:string){
        const user = await userReposytory.getUserById(userId);
        return user
    }
}

export default new userService()