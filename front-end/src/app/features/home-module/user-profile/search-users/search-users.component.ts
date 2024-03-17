import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProfileService } from 'src/app/core/Services/profile.service';
import { UserDetailInterface, UserFollowersInterface, UserSignupInterface } from 'src/app/model/userInterface';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {
  searchForm: FormGroup;
  isVisible = false;
  searchValue: string;
  @Output() searchText: EventEmitter<string> = new EventEmitter<string>;

  user: UserDetailInterface[] = [];

  constructor(private userSrvc: ProfileService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchValue: ['']
    });
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  searchOperation() {
    this.searchText.emit(this.searchValue);
    this.userSrvc.allUsers().subscribe((res: { status: string, datas: [UserDetailInterface] }) => {
      res.datas.map((x) => { this.user.push(x) });
      console.log(this.searchValue);

    }, (err) => {
      console.log(err);

    })

  }
  search() {
    const searchValue:String = this.searchForm.get('searchValue').value.toLowerCase();
    console.log(searchValue);
    
    // this.filteredUsers = this.users.filter(user =>
    //   user.name.toLowerCase().includes(searchValue)
    // );
  }

}
