import { Response,Request } from "express"
import userReposytory from "../../repositories/userReposytory"

class userController {
    async getUserById(req:Request, res: Response){
            const userId = req.params.id
            const user = req.user
            res.send(user)
    }
    async createUser(req:Request, res: Response){
        try{
            
        }catch(e){
            console.log(e)
        }
    }
    async deleteUserById(req:Request, res: Response){
        try{

        }catch(e){
            console.log(e)
        }
    }
    async updateUserById(req:Request, res: Response){
        try{
            
        }catch(e){
            console.log(e)
        }
    }
}

export default new userController()