import { IIngredients } from "../components/main/pizza-card/PizzaCard";
import { create } from "zustand";
import { pizzasData, STORAGE_KEY } from "./constants";

export interface IPizza {
  id: number;
  name: string;
  price: number;
  image: string;
  ingredients: IIngredients[];
  selectedIngredients: IIngredients[];
  totalAmount: number;
}

interface StoreState {
  pizzas: IPizza[];
  currentPizzaId: number;
  selectedPizza: IPizza | null;
  selectedIngredients: IIngredients[];
  setSelectedPizza: (id: number) => void;
  setSelectedIngredients: (ingredients: IIngredients[]) => void;
  addIngredient: (ingredient: IIngredients) => void;
  currentPizzaForDialog: IPizza | null;
  setCurrentPizzaForDialog: (id: number) => void;
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
}

const saveToStorage = (state: Partial<StoreState>) => {
  try {
    const dataToSave = {
      basket: state.basket,
      total: state.total,
      pizzas: state.pizzas,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (e) {
    console.error("Ошибка при сохранении в localStorage:", e);
  }
};

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Ошибка при загрузке из localStorage:", e);

    return null;
  }
};

export const useStore = create<StoreState>((set, get) => ({
  pizzas: pizzasData,
  currentPizzaId: 0,
  selectedPizza: null,
  selectedIngredients: [],
  currentPizzaForDialog: null,
  basket: [],
  totalAmount: 0,
  total: 0,

  initializeFromStorage: () => {
    const saveData = loadFromStorage();
    if (saveData) {
      set(saveData);
    }
  },

  updatePizzaSelectedIngredients: (pizzaId, ingredients) =>
    set((state) => {
      const newState = {
        pizzas: state.pizzas.map((pizza) =>
          pizza.id === pizzaId
            ? { ...pizza, selectedIngredients: ingredients }
            : pizza
        ),
        // currentPizzaForDialog:
        //   state.currentPizzaForDialog?.id === pizzaId
        //     ? {
        //         ...state.currentPizzaForDialog,
        //         selectedIngredients: ingredients,
        //       }
        //     : state.currentPizzaForDialog,
      };

      saveToStorage({ ...state, ...newState });

      return newState;
    }),

  setTotal: () =>
    set((state) => {
      const sum = state.basket.reduce((acc, item) => acc + item.totalAmount, 0);

      return {
        total: sum,
      };
    }),

  setSelectedPizza: (id) =>
    set((state) => {
      const findPizza = state.pizzas.find((pizza) => pizza.id === id);

      return {
        selectedPizza: findPizza,
        selectedIngredients: [],
      };
    }),

  addToCart: (id) =>
    set((state) => {
      const findPizza = state.pizzas.find((pizza) => pizza.id === id);
      if (!findPizza) return {};

      const pizzaForCart = {
        ...findPizza,
        selectedIngredients: findPizza.selectedIngredients || [],
      };

      const alreadyInBasket = state.basket.some((p) => p.id === id);

      let newBasket;
      if (alreadyInBasket) {
        newBasket = state.basket.map((p) => (p.id === id ? pizzaForCart : p));
      } else {
        newBasket = [...state.basket, pizzaForCart];
      }

      const sum = newBasket.reduce((acc, item) => acc + item.totalAmount, 0);
      const newState = {
        basket: newBasket,
        total: sum,
      };

      // Сохраняем в localStorage
      saveToStorage({ ...state, ...newState });

      return newState;

      // return {
      //   basket: newBasket,
      //   total: sum,
      // };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const newBasket = state.basket.filter((item) => item.id !== id);
      const sum = newBasket.reduce((acc, item) => acc + item.totalAmount, 0);
      const newState = {
        basket: newBasket,
        total: sum,
      };

      saveToStorage({ ...state, ...newState });

      return newState;
    }),

  setCurrentPizzaForDialog: (id) =>
    set((state) => {
      const findPizza = state.pizzas.find((pizza) => pizza.id === id) || null;

      return {
        ...state,
        currentPizzaForDialog: findPizza,
      };
    }),

  addIngredient: (ingredient) =>
    set((state) => ({
      selectedIngredients: [...state.selectedIngredients, ingredient],
    })),

  setSelectedIngredients: (ingredients) =>
    set({
      selectedIngredients: ingredients,
    }),
}));
