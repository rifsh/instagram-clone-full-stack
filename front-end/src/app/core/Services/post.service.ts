import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject, interval, switchMap, tap } from 'rxjs';
import { GetPostInterface, userPostsInterface } from 'src/app/model/postResponseInterface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  http: HttpClient = inject(HttpClient);
  // subject = new Subject<void>();
  userId: string = localStorage.getItem('userId');

  constructor() { }

  // get refreshSubject() {
  //   return this.subject
  // }

  addPostSrvc(formValues: NgForm, file: File): Observable<object> {
    const postImg: FormData = new FormData()
    postImg.append('img', file);
    postImg.append('caption', formValues.value.caption);
    const userId: string = localStorage.getItem('userId')
    return this.http.post(`https://chatternet.site/post/add-post/${userId}`, postImg)
  }

  getPost(): Observable<object> {
    return this.http.get(`https://chatternet.site/post/get-post`)
  }

  getPostById(postId: string): Observable<object> {
    return this.http.get(`https://chatternet.site/post/get-post-byId/${postId}`)
  }

  postLiking(PostId: string): Observable<object> {
    const userid: string = localStorage.getItem('userId');
    const userId = { userId: userid };
    return this.http.post(`https://chatternet.site/post/like-post/${PostId}`, userId)
  }

  getuserPosts() {
    this.http.get(`https://chatternet.site/post/get-post`).subscribe((res: GetPostInterface) => {
      const userPosts: userPostsInterface[] = res.datas.filter((x) => { return x.postedBy._id === localStorage.getItem('userId') });
      return userPosts
    }, (err) => {
      console.log(err);
    })
  }

  addComment(comment: string, postId: string): Observable<object> {
    const text = { text: comment, postId: postId };

    return this.http.post(`https://chatternet.site/post/add-comment/${this.userId}`, text)
  }

  viewComments(postId: string): Observable<object> {
    return this.http.get(`https://chatternet.site/post/post-comment/${postId}`)
  }

  postDelete(postid: string): Observable<object> {
    console.log(this.userId);

    const postId = { postId: postid };
    return this.http.post(`https://chatternet.site/post/delete-post/${this.userId}`, postId)
  }

}
