import { CardProps } from "types/CardProps";

export const getLocalStorage = (key:string) => {
  const data = localStorage.getItem(key);
  if (data !== null) {
    return JSON.parse(data);
  }
  return {};
};

export const setLocalStorage = (key:string, data: CardProps[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};
