import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PROVINCES } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRefineProvince = (code: string) => {
  const province = PROVINCES.find((province) => province.code === code);
  return province;
}
