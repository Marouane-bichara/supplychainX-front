import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProductDTO, ProductDTOResponse } from '../../models/admin/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/Product`;

  getAllProducts(): Observable<ProductDTOResponse[]> {
    return this.http.get<ProductDTOResponse[]>(this.baseUrl);
  }


  getProductById(id: number): Observable<ProductDTOResponse> {
    return this.http.get<ProductDTOResponse>(`${this.baseUrl}/Get-By-Id/${id}`);
  }

  createProduct(product: ProductDTO): Observable<ProductDTOResponse> {
    return this.http.post<ProductDTOResponse>(this.baseUrl, product);
  }

  updateProduct(id: number, product: ProductDTO): Observable<ProductDTOResponse> {
    return this.http.put<ProductDTOResponse>(`${this.baseUrl}/update/${id}`, product);
  }

  deleteProduct(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

 
  getLowStockProducts(threshold: number): Observable<ProductDTOResponse[]> {
    return this.http.get<ProductDTOResponse[]>(`${this.baseUrl}/low-stock/${threshold}`);
  }

}