import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  http: HttpClient = inject(HttpClient)

  constructor() {
    
  }

  getUser() {
    const userId:string = localStorage.getItem('userId');
    return this.http.get(`http://localhost:3000/clone/user-by-id/${userId}`)
  }



}
