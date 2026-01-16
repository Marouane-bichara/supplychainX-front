import { RawMaterial } from './raw-material.model';

export interface Supplier {
  id: number;         
  firstName: string;
  lastName: string;
  contact: string;
  rating: number;
  leadTime: number;
  rawMaterials?: RawMaterial[];
}
