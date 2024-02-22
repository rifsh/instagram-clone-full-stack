import { Component } from '@angular/core';
import { NavOptionsInterface } from './nav-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  navOptions: string[] = ['Home', 'Search', 'Explore', 'Reels', 'Message', 'Notifications', 'Create', 'Profile'];
  navigationItems = [
    {title: 'Home', icon:'../../../assets/side-nav/home.png', route:'/feature'},
    {title: 'Search', icon:'../../../assets/side-nav/search.png', route:'/feature'},
    {title: 'Explore', icon:'../../../assets/side-nav/explore.png', route:'/feature'},
    {title: 'Reels', icon:'../../../assets/side-nav/reel.png', route:'/feature'},
    {title: 'Messages', icon:'../../../assets/side-nav/messages.png', route:'/feature'},
    {title: 'Notifications', icon:'../../../assets/side-nav/notifications.png', route:'/feature'},
    {title: 'Create', icon:'../../../assets/side-nav/create.png', route:'/feature'},
    {title: 'Profile', icon:'', route:'/profile'}
  ];

  constructor(private router:Router) {}

  profile() {
    this.router.navigate([{ outlets: { primary: ['profile'] } }]);
    console.log('navs');
    
  }
}
