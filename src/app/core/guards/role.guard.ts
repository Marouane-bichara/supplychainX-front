import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  const requiredRoles = route.data?.['roles'] || [];
  
  if (requiredRoles.length === 0) {
    return true;
  }
  
  const hasRole = requiredRoles.some((role: string) => auth.hasRole(role));
  
  if (hasRole) {
    return true;
  }
  
  router.navigate(['/unauthorized']);
  return false;
};