import { IFood } from "../Foods/Foods.type";
import { IOrder } from "../Order/Order.type";
import { User } from "../User/user.types";

export type ModelBase = {
    id: string;
    createdAt: string;
    isDeleted: boolean
}

export interface OrderItem {
    orderId: string;
    order: IOrder;
    food: IFood;
    user?: User;
    userId?: string;
    price?: number ;
    quantity?: number;
    observations?: string;
    discount?: number;
    createdAt: Date;
}


export type ListPaginatation <T> = {
    page: number; 
    size: number; 
    totalItems: number; 
    totalPages: number; 
    data: T[]
}
