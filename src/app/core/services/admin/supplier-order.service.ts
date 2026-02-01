import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SupplierOrder } from '../../models/admin/supply-order.model';

export interface SupplyOrderRequest {
  supplierId: number;
  orderDate: string; 
  items: Record<number, number>; 
}

@Injectable({
  providedIn: 'root'
})
export class SupplierOrderService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/supplier-order`;

  getAll(): Observable<SupplierOrder[]> {
    return this.http.get<SupplierOrder[]>(this.baseUrl);
  }

  getById(id: number): Observable<SupplierOrder> {
    return this.http.get<SupplierOrder>(`${this.baseUrl}/id/${id}`);
  }

  create(payload: SupplyOrderRequest): Observable<SupplierOrder> {
    return this.http.post<SupplierOrder>(`${this.baseUrl}/create`, payload);
  }

  update(id: number, payload: SupplyOrderRequest): Observable<SupplierOrder> {
    return this.http.put<SupplierOrder>(`${this.baseUrl}/update/${id}`, payload);
  }
}
