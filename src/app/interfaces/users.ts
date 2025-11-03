export interface Users {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    restaurantName?: string;
    address?: string;
    phoneNumber?: string;
}

export interface NewUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    restaurantName?: string;
    address?: string;
    phoneNumber?: string;
}
