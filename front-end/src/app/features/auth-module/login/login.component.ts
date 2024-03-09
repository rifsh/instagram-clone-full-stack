import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/core/Services/auth-service.service';
import { LoginResponseInterface } from 'src/app/model/responseInterrfaace';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('loginForm') loginForm: NgForm;

  loader: boolean = false;
  loginbtn: boolean = true

  constructor(private router: Router, private authSrvc: AuthServiceService) {

  }

  login() {
    this.loader = true;
    this.loginbtn = false;

    this.authSrvc.loginSrvc(this.loginForm.value).subscribe((res:LoginResponseInterface) => {
      if (res) {
        localStorage.setItem('token',res.token);
        localStorage.setItem('userId',res.datas);
        this.loader = false;
        this.loginbtn = true;
        this.router.navigate(['feature/home']);
        alert('Logged successfully')
      }
    }, (err) => {
      console.log(err);
      this.loader = false;
      this.loginbtn = true
      alert('Something went wrong')
    });
  }

  signup() {
    this.router.navigate(['/sign-up']);
  }
}
