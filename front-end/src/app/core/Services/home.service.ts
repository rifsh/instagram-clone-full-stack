import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  subject = new Subject<void>();
  http: HttpClient = inject(HttpClient)

  constructor() {

  }

  get refreshSubject() {
    return this.subject
  }

  getUser() {
    const userId: string = localStorage.getItem('userId');
    return this.http.get(`http://localhost:3000/clone/user-by-id/${userId}`).pipe(tap(() => {
      this.refreshSubject.next();
    }))
  }



}
