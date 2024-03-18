import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const  authGuard: CanActivateFn = () => {

  
  const token = localStorage.getItem('token');
  const route:Router = inject(Router);
  const toast: MatSnackBar = inject(MatSnackBar)

  if (token) {
    return true
  } else {
    route.navigate(['']);
    toast.open('Please signup','',{
      duration:2000
    })
    return false;
  }
};
