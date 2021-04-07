import { IUser } from "./user";

export interface Session {
    user: IUser;
    token: string;
    csrf: string;
}
