import { IOrderItem, IOrderItemReadModel } from "../@types/generic";
import { OrderStatusEnum } from "../Enums/OrderStatusEnum";
import { User } from "../User/user.types";

export interface IOrder {
  id: string;
  orderNumber: number;
  numberOfInstallments: number;
  totalValue: number;
  status: OrderStatusEnum;
  user: User;
  userId: string;
  items: IOrderItem[];
  createdAt: string;
  updatedAt: string;
}


export interface IOrderReadModel extends IOrder {
  statusDisplay: string;
  items: IOrderItemReadModel[];
}