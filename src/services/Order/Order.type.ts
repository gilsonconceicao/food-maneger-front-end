import { OrderItem } from "../@types/generic";
import { OrderStatusEnum } from "../Enums/OrderStatusEnum";
import { User } from "../User/user.types";

export interface IOrder {
  id: string;
  requestNumber: number;
  status: OrderStatusEnum;
  user?: User | null;
  userId?: string | null;
  items: OrderItem[];
  createdAt: Date;
}


export interface IOrderReadModel {
  id: string;
  orderNumber: number;
  status: OrderStatusEnum;
  statusDisplay: string;
  user?: User | null;
  userId?: string | null;
  items: OrderItem[];
  createdAt: string;
  total: number
}