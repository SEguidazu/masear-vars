import { createContext } from "react";

export interface ContextProps {
  legislativo: { [key: string]: string }[];
  ejecutivo: { [key: string]: string }[];
  provincias: { name: string; id: string }[];
  isLoading?: boolean;
}

export const initialContext: ContextProps = {
  legislativo: [],
  ejecutivo: [],
  provincias: [],
  isLoading: false,
};

const MapContext = createContext<ContextProps>(initialContext);

export default MapContext;
