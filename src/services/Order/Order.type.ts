import { IOrderItem, IOrderItemReadModel, BaseModel } from "../@types/generic";
import { OrderStatusEnum } from "../Enums/OrderStatusEnum";
import { User } from "../User/user.types";

export interface IOrder extends BaseModel {
  id: string;
  orderNumber: number;
  numberOfInstallments: number;
  totalValue: number;
  status: OrderStatusEnum;
  user: User;
  userId: string;
  paymentId: string;
  items: IOrderItem[];
  failureReason: string
}


export interface  IOrderReadModel extends Omit<IOrder, "status"> {
  statusDisplay: string;
  status: string;
  observations: string;
  items: IOrderItemReadModel[];
}