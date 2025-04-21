export type AuthType = {
    id: string;
    name:string;
    email: string;
    phone: string;
    role: string;
    password:string;
}
export type AuthCandidateType = {
    ip:string;
    name:string;
    email: string;
    phone: string;
    password:string;
}




export type UserType = {
    id: string;
    name:string;
    email: string;
    phone: string;
    role: string;
}
export type UserDBType = {
    id: string;
    name:string;
    email: string;
    phone: string;
    role_id: string;
    password:string;
}
export type UserRoleDBType = {
    id:string;
    role: string;
}





export type refreshTokenType = {
    ip:string;
    id:string;
    user_id: string;
    token:string;
    expires_at: Date;
    created_at: Date;
}

