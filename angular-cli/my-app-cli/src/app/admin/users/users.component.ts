import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cli-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[];
  hasPermission = false;
  constructor() { }

  ngOnInit() {
    if (this.hasPermission) {
      this.getUsers()
        .then(users => this.users = users)
        .catch(e => console.log(e.message));
    } else {
      this.users = [];
    }
  }

  async getUsers() {
    return [
      {name: 'john', email: 'john@angular.com'},
      {name: 'colleen', email: 'colleen@angular.com'},
    ];
  } 
}
