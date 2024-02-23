import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http: HttpClient = inject(HttpClient)

  constructor() { }

  userId: string = localStorage.getItem('userId')
  imageUpdating(fomrValues: NgForm, file: File):Observable<object> {
    const profileImg = new FormData();
    profileImg.append('profilePic', file);

    return this.http.put(`http://localhost:3000/clone/user-profile-img/${this.userId}`, profileImg)
  }

  imgRemoving():Observable<object> {
    return this.http.delete(`http://localhost:3000/clone/user-profile-remove/${this.userId}`)
  }

  updateProfile(values:NgForm):Observable<object> {
    return this.http.put(`http://localhost:3000/clone/user-profile/${this.userId}`,values.value)
  }

}
