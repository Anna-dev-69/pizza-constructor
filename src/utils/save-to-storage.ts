import { STORAGE_KEY } from "../store/constants";
import { StoreState } from "../store/interfaces";

export const saveToStorage = (state: StoreState) => {
  try {
    const dataToSave = {
      basket: state.basket,
      total: state.total,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (e) {
    console.error("Ошибка при сохранении в localStorage:", e);
  }
};
