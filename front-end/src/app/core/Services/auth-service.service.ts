import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSignupInterface } from 'src/app/model/userInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  signUpSrvc(signupValues: NgForm) {
    return this.http.post('http://localhost:3000/clone/user-signup', signupValues.value)
  }

  dobSrvc(values: NgForm) {
    const phone: string = localStorage.getItem('phone');
    const id: string = localStorage.getItem('userId');
    return this.http.post(`http://localhost:3000/clone/userdob/${id}`, values.value)
  }

  otpValidationSrvc(otp: NgForm) {
    const userId: string = localStorage.getItem('userId');
    return this.http.post(`http://localhost:3000/clone/otpvalidation/${userId}`, otp.value);
  }

  changePhoneNumberSrvc(changeNumber: NgForm) {
    const userId: string = localStorage.getItem('userId');
    this.http.post(`http://localhost:3000/clone/change-phone-number/${userId}`, changeNumber.value).subscribe((res) => {
      console.log(res);
      if (res) {
        this.http.post
      }
    }, (err) => {
      console.log(err);

    })
  }

  loginSrvc(loginValues: NgForm) {
    return this.http.post('http://localhost:3000/clone/login', loginValues)
  }

}
