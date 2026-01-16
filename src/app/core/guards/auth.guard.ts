import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.getToken();
  console.log('AUTH GUARD TOKEN:', token); 

  if (token) {
    return true;
  }

  router.navigateByUrl('login'); 
  return false;
};
