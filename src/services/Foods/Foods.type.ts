import { OrderItems } from "../@types/generic";
import { FoodCategoryEnum } from "../Enums/FoodCategoryEnum";

export interface Food {
  id: string;
  name: string;
  url: string;
  description: string;
  isAvailable: boolean;
  price: number;
  category: FoodCategoryEnum | null;
  items: OrderItems[];
  createdAt: Date;
}
export interface FoodCreateDTO {
  id?: string;
  name?: string;
  url?: string;
  description?: string;
  isAvailable?: boolean;
  price?: number;
  category?: FoodCategoryEnum | null;
  items?: OrderItems[];
  createdAt?: Date;
}

export type FoodParamsQuery = {
  page?: number,
  size?: number,
  searchString?: string | null
}
