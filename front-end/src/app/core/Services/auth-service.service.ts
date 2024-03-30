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
    // https://chatternet.site/post/get-post
    return this.http.post('https://chatternet.site/clone/user-signup', signupValues.value)
  }

  dobSrvc(values: NgForm) {
    const phone: string = localStorage.getItem('phone');
    const id: string = localStorage.getItem('userId');
    return this.http.post(`https://chatternet.site/clone/userdob/${id}`, values.value)
  }

  otpValidationSrvc(otp: NgForm) {
    const userId: string = localStorage.getItem('userId');
    return this.http.post(`https://chatternet.site/clone/otpvalidation/${userId}`, otp.value);
  }

  changePhoneNumberSrvc(changeNumber: NgForm) {
    const userId: string = localStorage.getItem('userId');
    this.http.post(`https://chatternet.site/clone/change-phone-number/${userId}`, changeNumber.value).subscribe((res) => {
      console.log(res);
      if (res) {
        this.http.post
      }
    }, (err) => {
      console.log(err);

    })
  }

  loginSrvc(loginValues: NgForm) {
    return this.http.post('https://chatternet.site/clone/login', loginValues)
  }

}
