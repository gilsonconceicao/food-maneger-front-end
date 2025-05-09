import { IFood } from "../Foods/Foods.type";
import { Order } from "../Order/Order.type";
import { User } from "../User/user.types";

export type ModelBase = {
    id: string;
    createdAt: string;
    isDeleted: boolean
}

export interface OrderItems {
    orderId: string;
    order: Order;
    food: IFood;
    user?: User | null;
    userId?: string | null;
    price?: number | null;
    quantity?: number | null;
    observations?: string | null;
    discount?: number | null;
    createdAt: Date;
}


export type ListPaginatation <T> = {
    page: number; 
    size: number; 
    totalItems: number; 
    totalPages: number; 
    data: T[]
}
