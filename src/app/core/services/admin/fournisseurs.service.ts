import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Supplier } from '../../models/admin/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class FournisseursService {

  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/supplier`;
  
  getFournisseurs(): Observable<Supplier[]> {
    console.log(this.http.get<Supplier[]>(this.baseUrl));
    
    return this.http.get<Supplier[]>(this.baseUrl);
  }

  addFournisseur(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.baseUrl, supplier);
  }

  updateFournisseur(id: number, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.baseUrl}/update/id/${id}`, supplier);
  }

  getFournisseurById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.baseUrl}/id/${id}`);
  }

  searchFournisseur(firstName: string, lastName: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.baseUrl}/search/${firstName}/${lastName}`);
  }

  deleteFournisseur(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

}
