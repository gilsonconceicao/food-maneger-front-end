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

export const foodCategories = [
  { value: 'Appetizer', label: 'Entrada' },
  { value: 'MainCourse', label: 'Prato Principal' },
  { value: 'Dessert', label: 'Sobremesa' },
  { value: 'Beverage', label: 'Bebida' },
  { value: 'Salad', label: 'Salada' },
  { value: 'Soup', label: 'Sopa' },
  { value: 'Snack', label: 'Lanche' },
  { value: 'Sweet', label: 'Doce' },
  { value: 'Fruit', label: 'Fruta' },
  { value: 'Pasta', label: 'Massa' },
  { value: 'Pizza', label: 'Pizza' },
  { value: 'Sushi', label: 'Sushi' },
  { value: 'Meat', label: 'Carne' },
  { value: 'Fish', label: 'Peixe' },
  { value: 'Seafood', label: 'Mariscos' },
  { value: 'FastFood', label: 'Fast Food' },
  { value: 'Vegetarian', label: 'Vegetariano' },
  { value: 'Vegan', label: 'Vegano' },
];
