
export interface IUser {
    id: number;
    uuid: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    active: boolean;
    api_token?: string;
    grant_type?: string;
    canEditPrice: boolean;
}

