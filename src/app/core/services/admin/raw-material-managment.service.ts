import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { RawMaterial } from '../../models/admin/raw-material.model';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialManagmentService {


  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/raw-material`;
  
  getAllRawMaterial(): Observable<RawMaterial[]>{
    return this.http.get<RawMaterial[]>(this.baseUrl);
  } 

  createRawMaterial(rawMaterial: RawMaterial):Observable<RawMaterial>{
    return this.http.post<RawMaterial>(`${this.baseUrl}/create/`, rawMaterial);
  }

}
