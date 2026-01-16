import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  saveToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  saveUser(user: any): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    const user = sessionStorage.getItem(this.USER_KEY);
    if (!user || user === 'undefined' || user === 'null') {
      return null;
    }
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }

  clear(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
}
