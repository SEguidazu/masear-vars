import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import judicialData from "@/data/masear-vars-judicial.json"
import legislativoData from "@/data/masear-vars-legislativo.json"

type Rule = {
  code: string;
  Provincia: string;
  [key: string]: string | number;
}

const rulesData = [
  { id: "judicial", data: judicialData },
  { id: "legislativo", data: legislativoData },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getRuleData = (value: string) => {
  const rule = rulesData.find(c => c.id === value);

  if (!rule) return null 

  return rule.data as Array<Rule>;
}

const getProvinceRule = (rule: Array<Partial<Rule>>, provinceCode: string) => {
  const provinceRule = rule.find(c => c.code === provinceCode);

  if (!provinceRule) return null

  delete provinceRule.code;
  delete provinceRule.Provincia;

  return provinceRule;
}


export const getRefineRule = (value: string, provinceCode: string) => {
  const rule = getRuleData(value);

  if (!rule) return null 

  const provinceRule = getProvinceRule(rule, provinceCode);
  
  if (!provinceRule) return null

  return provinceRule;
}

