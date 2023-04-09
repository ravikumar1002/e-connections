export interface IUserRegistration {
    email: string;
    password: string;
}


export interface IUserLogin {
    email: string;
    password: string;
}


export type IUsersData = IUserData[]

export interface IUserData {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}