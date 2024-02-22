import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const  authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  const route:Router = inject(Router);
  if (token) {
    return true
  } else {
    route.navigate(['']);
    alert('Please signup')
    return false;
  }
};
