import { OrderItems } from "../@types/generic";
import { OrderStatusEnum } from "../Enums/OrderStatusEnum";
import { User } from "../User/user.types";

export interface Order {
    id: string;                
    requestNumber: number;     
    status: OrderStatusEnum;      
    user?: User | null;        
    userId?: string | null;    
    items: OrderItems[];       
    createdAt: Date;           
  }