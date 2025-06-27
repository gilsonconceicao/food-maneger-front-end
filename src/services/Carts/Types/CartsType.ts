import { BaseModel } from "@/services/@types/generic"
import { IFood } from "@/services/Foods/Foods.type";



export type CartType = {
    data: Cart[];
    summary: SummaryType
}; 

export type Cart = {
    foodId: string
    quantity: number
    food: IFood
    observations: string
} & BaseModel; 

export type SummaryType = {
    totalValue: number
}

export type CartTypeCreate = {
    foodId: string;
    quantity?: number;
    observations?: string
    isPersist: boolean
}

export type UpdateTypeModel = {
    foodId: string;
    orderId?: string
    quantity?: number;
}