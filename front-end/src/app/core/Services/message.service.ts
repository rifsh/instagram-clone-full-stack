import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import io, { Socket } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  socket: Socket;

  http: HttpClient = inject(HttpClient);

  constructor() {
    this.socket = io('https://chatternet.site')
  }

  joinRoom(roomId) {
    this.socket.emit("join-room", roomId);
  }

  sentMessage(datas) {
    this.socket.emit("send-message", datas);
  }

  recieveMessage() {
    return new Observable<any>(observer => {
      this.socket.on("new-message", (data) => {
        observer.next(data)
      })
      return () => {
        this.socket.disconnect();
      }
    })
  }

  getMessages(userId:string):Observable<object> {
    return this.http.get(`https://chatternet.site/clone/user-messages/${userId}`)
  }

}
