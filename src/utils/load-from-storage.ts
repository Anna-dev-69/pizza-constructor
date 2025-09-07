import { STORAGE_KEY } from "../store/constants";

export const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Ошибка при загрузке из localStorage:", e);

    return null;
  }
};
