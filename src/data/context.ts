import { createContext } from 'react';

export interface ContextProps {
  legislativo: { [key: string]: string }[];
  ejecutivo: { [key: string]: string }[];
  provincias: { name: string, id: string }[];
}

export const initialContext: ContextProps = {
  legislativo: [],
  ejecutivo: [],
  provincias: []
}

const MapContext = createContext<ContextProps>(initialContext);

export default MapContext;