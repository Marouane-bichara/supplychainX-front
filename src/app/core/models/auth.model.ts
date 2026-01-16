export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;  
}

export interface User {
  email: string;
  roles: string[];
  firstName?: string;
  lastName?: string;
}