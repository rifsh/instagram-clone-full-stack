import { Component, OnInit } from '@angular/core';
// import { NavOptionsInterface } from './nav-interface';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/core/Services/home.service';
import { UserSignupInterface } from 'src/app/model/userInterface';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from 'src/app/features/home-module/post/add-post/add-post.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  navProfilePic: string = '';

  constructor(private router: Router, private homeSrvc: HomeService,private dialog: MatDialog) { }


  ngOnInit(): void {
    this.homeSrvc.getUser().subscribe((res: UserSignupInterface) => {
      this.navProfilePic = res.datas.profilePic;
    }, (err) => {
      console.log(err);

    })
  }

  navOptions: string[] = ['Home', 'Search', 'Explore', 'Reels', 'Message', 'Notifications', 'Create', 'Profile'];
  navigationItems = [
    { title: 'Home', icon: '../../../assets/side-nav/home.png', route: '/home' },
    { title: 'Search', icon: '../../../assets/side-nav/search.png', route: '/user-search' },
    { title: 'Explore', icon: '../../../assets/side-nav/explore.png', route: '/feature' },
    { title: 'Reels', icon: '../../../assets/side-nav/reel.png', route: '/feature' },
    { title: 'Messages', icon: '../../../assets/side-nav/messages.png', route: '/feature' },
    { title: 'Notifications', icon: '../../../assets/side-nav/notifications.png', route: '/feature' },
    // { title: 'Create', icon: '../../../assets/side-nav/create.png', route: '/feature' },
  ];

  addPost() {
    this.dialog.open(AddPostComponent)
  }

  logOut() {
    localStorage.clear();
    this.router.navigate([''])
  }

}
