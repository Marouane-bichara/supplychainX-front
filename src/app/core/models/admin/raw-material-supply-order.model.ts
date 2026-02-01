import { RawMaterial } from './raw-material.model';

export interface RawMaterialSupplyOrder {
  id: number;
  quantity: number;
  rawMaterial: RawMaterial;
}
