import { IFood, IFoodReadModel } from "../Foods/Foods.type";
import { IOrder } from "../Order/Order.type";
import { User } from "../User/user.types";

export interface BaseModel  {
    id: string;
    createdAt: string;
    updatedAt: string;
    createdByUserId: string
    createdByUserName: string
    isDeleted: boolean
}

export interface IOrderItem {
    orderId: string;
    order: IOrder;
    food: IFood;
    user?: User;
    userId?: string;
    price?: number;
    quantity?: number;
    observations?: string;
    discount?: number;
    createdAt: Date;
}

export interface IOrderItemReadModel extends IOrderItem {
    food: IFoodReadModel;
    foodId: string;
}

export type ListPaginatation<T> = {
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
    data: T[]
}
