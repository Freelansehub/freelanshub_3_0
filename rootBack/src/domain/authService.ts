
import bcrypt from "bcryptjs"
import { userRepository, UserType } from "../repositories/userRepository";
import { AuthRepository } from "../repositories/authPepository";

export const authService = {
    async createUser(
        name: string,
        password: string,
        email: string,
        phone: string,
        role: string
    ) { 
        
        const passwordSalt = await bcrypt.genSalt(10);
        
        const passwordHash = await this._generateHash(password, passwordSalt);
        
        const newUser = {
            name,
            password: passwordHash,
            email,
            phone,
            role
        };
        
        try {
            const createdUser = await AuthRepository.createUser(newUser);
            return createdUser;
        } catch (error) {
            console.error("Error creating user:", error);
            return null; 
        }
    },

    async checkCredentials(nameOrEmail:string, password:string):Promise<UserType | null> {
        const user = await userRepository.findUserByNameOrEmail(nameOrEmail);
        console.log(user)
        if (!user) return null;
        const result = await bcrypt.compare(password, user.password);
        return result ? user : null;
    },

    async _generateHash(password: string, salt: string): Promise<string> {
        // Generate the hash of the password using bcrypt
        console.log("user password = " + password)
        const hash = bcrypt.hash(password, salt);
        return hash;
    },
};
