import { Supplier } from './supplier.model';

export interface RawMaterial {
  name: string;
  unit: string;
  stock: number;
  stockMin: number;
  suppliers: Supplier[];
}
