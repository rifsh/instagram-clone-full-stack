import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/core/Services/message.service';
import { ProfileService } from 'src/app/core/Services/profile.service';
import { MessageInterface, MessageResponseInterface } from 'src/app/model/messageInterfa';
import { UserDetailInterface } from 'src/app/model/userInterface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  allusers: UserDetailInterface[] = [];
  messageArray: MessageInterface[] = [];

  userProfile: string;
  userName: string;
  receiverId: string;
  roomId: string = 'room 1'
  @ViewChild('messageForm') messageData: NgForm;

  userId: string = localStorage.getItem('userId');


  constructor(private profileSrvc: ProfileService, private chatSrvc: MessageService) { }

  ngOnInit(): void {
    this.profileSrvc.allUsers().subscribe((allUser: { status: string, datas: [UserDetailInterface] }) => {
      allUser.datas.filter((x) => { return x._id !== this.userId }).map((x) => { return this.allusers.push(x) });
    }, (err) => {
      console.log(err);
    })
    this.chatSrvc.recieveMessage().subscribe((res: MessageInterface) => {
      this.messageArray.push(res);
      console.log(this.messageArray);

    }, (err) => {
      console.log(err);
    })

    this.chatSrvc.joinRoom(this.roomId);

    this.chatSrvc.getMessages(this.userId).subscribe((res:MessageResponseInterface)=>{
      this.messageArray = res.message;
    })


  }

  userMessaging(messageUserId: string) {
    this.profileSrvc.userById(messageUserId).subscribe((res: { status: string, datas: UserDetailInterface }) => {
      this.userProfile = res.datas.profilePic;
      this.userName = res.datas.username;
      this.receiverId = res.datas._id;
    })
  }

  sendMessage() {
    const data = {
      sender: this.userId,
      receiver: this.receiverId,
      message: this.messageData.value.message,
      roomId: this.roomId
    }
    this.chatSrvc.sentMessage(data)
  }

}
