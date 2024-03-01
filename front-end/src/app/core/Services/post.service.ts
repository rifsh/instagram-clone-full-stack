import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  addPostSrvc(formValues: NgForm, file: File): Observable<object> {
    const postImg: FormData = new FormData()
    postImg.append('img', file);
    postImg.append('caption', formValues.value.caption);
    const userId: string = localStorage.getItem('userId')
    return this.http.post(`http://localhost:3000/post/add-post/${userId}`, postImg)
  }

  getPost(): Observable<object> {
    return this.http.get(`http://localhost:3000/post/get-post`)
  }

  postLiking(PostId: string): Observable<object> {
    const userid: string = localStorage.getItem('userId');
    const userId = { userId: userid };
    return this.http.post(`http://localhost:3000/post/like-post/${PostId}`, userId)
  }

}
