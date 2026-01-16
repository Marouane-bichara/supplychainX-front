import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenService = inject(TokenService);

  currentUser = signal<any>(this.tokenService.getUser());
  isAuthenticated = signal<boolean>(this.tokenService.hasToken());

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((response: any) => {
          this.tokenService.saveToken(response.accessToken);
          
          const decoded = this.tokenService.decodeToken(response.accessToken);
          
          console.log('Decoded JWT:', decoded); 
          
          const user = {
            email: decoded.sub || email,
            roles: decoded.role ? [decoded.role] : (decoded.roles || ['USER']),
            firstName: email.split('@')[0],
            lastName: ''
          };
          
          console.log('Created user:', user); 
          
          this.tokenService.saveUser(user);
          this.currentUser.set(user);
          this.isAuthenticated.set(true);
          
          



   })
      );
  }

  logout(): void {
    this.tokenService.clear();
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user?.roles?.includes(role) || false;
  }
}