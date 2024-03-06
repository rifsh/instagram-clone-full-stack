import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { GetPostInterface, userPostsInterface } from 'src/app/model/postResponseInterface';

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

  getPostById(postId: string): Observable<object> {
    return this.http.get(`http://localhost:3000/post/get-post-byId/${postId}`)
  }

  postLiking(PostId: string): Observable<object> {
    const userid: string = localStorage.getItem('userId');
    const userId = { userId: userid };
    return this.http.post(`http://localhost:3000/post/like-post/${PostId}`, userId)
  }

  getuserPosts() {
    this.http.get(`http://localhost:3000/post/get-post`).subscribe((res: GetPostInterface) => {
      const userPosts: userPostsInterface[] = res.datas.filter((x) => { return x.postedBy._id === localStorage.getItem('userId') });
      return userPosts
    }, (err) => {
      console.log(err);
    })
  }

}
