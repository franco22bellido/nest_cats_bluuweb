export interface RequestUser extends Request{
    user: {
        email: string,
        role: string,
        iat: number,
        exp: number
    };
}