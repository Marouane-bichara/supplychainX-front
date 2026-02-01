import { Supplier } from './supplier.model';

export interface RawMaterial {
  idMaterial: number;   
  name: string;
  unit: string;
  stock: number;
  stockMin: number;
  suppliers: Supplier[];
}
