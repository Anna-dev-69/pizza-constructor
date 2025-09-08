export interface IIngredients {
  id: string;
  name: string;
  price: number;
}

export interface IPizza {
  id: number;
  name: string;
  price: number;
  image: string;
  ingredients: IIngredients[];
  selectedIngredients: IIngredients[];
  totalAmount: number;
}

export interface StoreState {
  pizzas: IPizza[];
  currentPizzaId: number;
  selectedPizza: IPizza | null;
  selectedIngredients: IIngredients[];
  setSelectedPizza: (id: number) => void;
  setSelectedIngredients: (ingredients: IIngredients[]) => void;
  addIngredient: (ingredient: IIngredients) => void;
  basket: IPizza[];
  addToCart: (id: number) => void;
  totalAmount: number;
  total: number;
  updatePizzaSelectedIngredients: (
    pizzaId: number,
    ingredients: IIngredients[]
  ) => void;
  initializeFromStorage: () => void;
  removeFromCart: (id: number) => void;
  isCartEmpty: boolean;
}
