import { ModelBase } from "@/services/@types/generic"
import { Food } from "@/services/Foods/Foods.type";



export type CartType = {
    data: Cart[];
    summary: SummaryType
}; 

export type Cart = {
    foodId: string
    quantity: number
    food: Food
    observations: string
} & ModelBase; 

export type SummaryType = {
    totalValue: number
}

export type CartTypeCreate = {
    foodId: string;
    quantity?: number;
    observations?: string
}