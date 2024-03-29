import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OtpResponseInterface, ResponseInterface } from '../../../model/responseInterrfaace';
import { AuthServiceService } from 'src/app/core/Services/auth-service.service';
import { UserSignupInterface } from 'src/app/model/userInterface';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  signupPage: boolean = true;
  dobPage: boolean = false;
  loader: boolean = false;
  next: boolean = true;
  OtpValidationPage: boolean = false;
  changeNumberPage: boolean = false;
  email: string;

  @ViewChild('signupForm') signupForm: NgForm;
  @ViewChild('dobForm') dobForm: NgForm;
  @ViewChild('otpForm') otpForm: NgForm;
  @ViewChild('changeNumberFrom') changeNumberFrom: NgForm;

  selectedDate: any = { day: null, month: null, year: null };
  days: number[] = [...Array(31).keys()].map((i) => i + 1);
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  years: number[] = [...Array(200).keys()].map((i) => 2024 - i);

  ngOnInit(): void {
    this.email = localStorage.getItem('phone');

  }

  constructor(private authSrvc: AuthServiceService, private route: Router,private snack:MatSnackBar) {

  }

  signup() {
    this.authSrvc.signUpSrvc(this.signupForm).subscribe((res: UserSignupInterface) => {
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem('email', res.datas.email);
        localStorage.setItem('userId', res.datas._id);
        this.dobPage = true;
        this.signupPage = false;
      } else {
        this.dobPage = false;
        this.signupPage = true;
      }
    }, (err) => {
      console.log(err);
    })
  }

  dob() {
    this.loader = true;
    this.next = false;

    this.authSrvc.dobSrvc(this.dobForm).subscribe((res) => {
      console.log(res);
      if (res) {
        this.loader = false;
        this.next = true;
        this.dobPage = false;
        this.OtpValidationPage = true;
      }
    }, (err) => {
      console.log(err);
      this.loader = false;
      this.next = true;
    })
  }

  otpValidation() {
    this.email = localStorage.getItem('email');
    this.authSrvc.otpValidationSrvc(this.otpForm).subscribe((res: OtpResponseInterface) => {
      if (res.message === 'Otp verified') {
        localStorage.setItem('token',res.token);
        this.snack.open('OTP verified','Ok',{
          duration: 2000,
          direction:'ltr'
        })
        this.route.navigate(['feature']);
      } else {
        this.snack.open('Enter a vlid OTP','Ok',{
          duration: 2000,
          direction:'ltr'
        })
      }
    }, (err) => {
      console.log(err);
      alert('Something went wrong')
    })

  }

  changeNumber() {
    this.OtpValidationPage = false;
    this.changeNumberPage = true;
  }

  numberChanging() {
    this.authSrvc.changePhoneNumberSrvc(this.changeNumberFrom);
    // console.log(this.changeNumberFrom.value);
  }

  goBack(previousPage: boolean, currentPage: boolean) {
    this.signupPage = true;
    this.dobPage = false;
    this.changeNumberPage = false;
  }

  login() {
    this.route.navigate(['']);
  }

}
