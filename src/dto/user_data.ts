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
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Geo {
    lat: string;
    lng: string;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}
