import { BaseModel } from "@/services/@types/generic";

export type User = {
    name: string;
    phoneNumber: string
    email: string
    address: Address
} & BaseModel;

export interface Address {
    id: string;
    street: string;
    city: string;
    state: string;
    complement: string;
    zipCode: string;
    number: number;
    user?: User | null;
    userId?: string | null;
}

export type CreateUserType = {
    name?: string;
    phoneNumber?: string
    address?: CreateAddress
}

export type CreateAddress = {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    number: number;
}