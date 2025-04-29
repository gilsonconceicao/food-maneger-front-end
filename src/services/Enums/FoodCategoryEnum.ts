export enum FoodCategoryEnum {
    Appetizer = 'Appetizer',
    MainCourse = 'MainCourse',
    Dessert = 'Dessert',
    Beverage = 'Beverage',
    Salad = 'Salad',
    Soup = 'Soup',
    Snack = 'Snack',
    Sweet = 'Sweet',
    Fruit = 'Fruit',
    Pasta = 'Pasta',
    Pizza = 'Pizza',
    Sushi = 'Sushi',
    Meat = 'Meat',
    Fish = 'Fish',
    Seafood = 'Seafood',
    FastFood = 'FastFood',
    Vegetarian = 'Vegetarian',
    Vegan = 'Vegan'
}

// Mapeamento para as descrições em português
export const FoodCategoryDescriptions: Record<FoodCategoryEnum, string> = {
    [FoodCategoryEnum.Appetizer]: "Entrada",
    [FoodCategoryEnum.MainCourse]: "Prato Principal",
    [FoodCategoryEnum.Dessert]: "Sobremesa",
    [FoodCategoryEnum.Beverage]: "Bebida",
    [FoodCategoryEnum.Salad]: "Salada",
    [FoodCategoryEnum.Soup]: "Sopa",
    [FoodCategoryEnum.Snack]: "Lanche",
    [FoodCategoryEnum.Sweet]: "Doce",
    [FoodCategoryEnum.Fruit]: "Fruta",
    [FoodCategoryEnum.Pasta]: "Massa",
    [FoodCategoryEnum.Pizza]: "Pizza",
    [FoodCategoryEnum.Sushi]: "Sushi",
    [FoodCategoryEnum.Meat]: "Carne",
    [FoodCategoryEnum.Fish]: "Peixe",
    [FoodCategoryEnum.Seafood]: "Mariscos",
    [FoodCategoryEnum.FastFood]: "Fast Food",
    [FoodCategoryEnum.Vegetarian]: "Vegetariano",
    [FoodCategoryEnum.Vegan]: "Vegano"
};

export const foodCategoriesList = [
    { label: "Entrada", value: "Appetizer" },
    { label: "Prato Principal", value: "MainCourse" },
    { label: "Sobremesa", value: "Dessert" },
    { label: "Bebida", value: "Beverage" },
    { label: "Salada", value: "Salad" },
    { label: "Sopa", value: "Soup" },
    { label: "Lanche", value: "Snack" },
    { label: "Doce", value: "Sweet" },
    { label: "Fruta", value: "Fruit" },
    { label: "Massa", value: "Pasta" },
    { label: "Pizza", value: "Pizza" },
    { label: "Sushi", value: "Sushi" },
    { label: "Carne", value: "Meat" },
    { label: "Peixe", value: "Fish" },
    { label: "Mariscos", value: "Seafood" },
    { label: "Fast Food", value: "FastFood" },
    { label: "Vegetariano", value: "Vegetarian" },
    { label: "Vegano", value: "Vegan" }
  ];
  