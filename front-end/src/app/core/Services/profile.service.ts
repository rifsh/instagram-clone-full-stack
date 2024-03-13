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

  userId: string = localStorage.getItem('userId');

  allUsers(): Observable<object> {
    return this.http.get('http://localhost:3000/clone/users');
  }
  imageUpdating(fomrValues: NgForm, file: File): Observable<object> {
    const profileImg = new FormData();
    profileImg.append('profilePic', file);

    return this.http.put(`http://localhost:3000/clone/user-profile-img/${this.userId}`, profileImg)
  }

  imgRemoving(): Observable<object> {
    return this.http.delete(`http://localhost:3000/clone/user-profile-remove/${this.userId}`)
  }

  updateProfile(values: NgForm): Observable<object> {
    return this.http.put(`http://localhost:3000/clone/user-profile/${this.userId}`, values.value)
  }

  userById(userId: string): Observable<object> {
    return this.http.get(`http://localhost:3000/clone/user-by-id/${userId}`)
  }

  following(id: string): Observable<object> {
    const followerId = { followerId: id };
    return this.http.post(`http://localhost:3000/clone/user-following/${this.userId}`, followerId)
  }

  getFollowers(id: string): Observable<object> {
    return this.http.get(`http://localhost:3000/clone/user-followers-list/${id}`)
  }

  getFollowing(id: string): Observable<object> {
    return this.http.get(`http://localhost:3000/clone/user-following-list/${id}`)
  }

  removeFollower(id: string): Observable<object> {
    const followerId = { followerId: id };
    return this.http.post(`http://localhost:3000/clone/user-follower-remove/${this.userId}`, followerId)
  }
  removeFollowing(id:string): Observable<object> {
    const followingUser = { followingUser: id };
    return this.http.post(`http://localhost:3000/clone/user-following-remove/${this.userId}`,followingUser)
  }
}
