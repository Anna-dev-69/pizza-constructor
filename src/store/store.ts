import { create } from "zustand";
import { saveToStorage } from "../utils/save-to-storage";
import { loadFromStorage } from "../utils/load-from-storage";
import { StoreState } from "./interfaces";
import { pizzasData } from "./mock-data";

export const useStore = create<StoreState>((set, get) => ({
  pizzas: pizzasData,
  currentPizzaId: 0,
  selectedPizza: null,
  selectedIngredients: [],
  basket: [],
  totalAmount: 0,
  total: 0,

  initializeFromStorage: () => {
    const saveData = loadFromStorage();
    if (saveData) {
      set((state) => ({
        ...state,
        ...saveData,
      }));
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
        selectedIngredients: findPizza?.selectedIngredients || [],
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

      saveToStorage({ ...state, ...newState });

      return newState;
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

  addIngredient: (ingredient) =>
    set((state) => ({
      selectedIngredients: [...state.selectedIngredients, ingredient],
    })),

  setSelectedIngredients: (ingredients) =>
    set({
      selectedIngredients: ingredients,
    }),
}));
