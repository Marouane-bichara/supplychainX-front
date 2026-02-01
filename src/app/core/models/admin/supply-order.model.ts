import { Supplier } from './supplier.model';
import { RawMaterialSupplyOrder } from './raw-material-supply-order.model';

export interface SupplierOrder {
  idOrder: number;
  supplier: Supplier;
  orderDate: string;
  status: string;
  rawMaterialSupplyOrders: RawMaterialSupplyOrder[];
}
