import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  permissions: string[];
  exp: number;
}

export const permissionGuard = (requiredPermission: string): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const token = localStorage.getItem('access_token');

    if (!token) {
      router.navigate(['/login']);
      return false;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        router.navigate(['/login']);
        return false;
      }

      const userPermissions = decoded.permissions || [];
      if (!userPermissions.includes(requiredPermission)) {
        router.navigate(['/unauthorized']);
        return false;
      }

      return true;
    } catch (e) {
      console.error('Invalid token:', e);
      router.navigate(['/login']);
      return false;
    }
  };
};
