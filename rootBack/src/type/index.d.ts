import { UserType } from "./type";

declare global {
    declare namespace Express {
        export interface Request{
            user: UserType | null
        }
    }
}