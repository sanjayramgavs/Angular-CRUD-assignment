import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string = '';
  formData: any = {
    userid: '',
    password: '',
    email: ''
  };
  selectedUserId: any = null;
  isCreateMode: boolean = true;
  selectedUserData: any = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.dataService.getAllUsers()
      .then((response) => {
        this.users = response.data;
        this.handleSearch();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleSearch() {
    const searchLower = this.searchText.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      (user.userid && user.userid.toString().toLowerCase().includes(searchLower)) ||
      (user.email && user.email.toString().toLowerCase().includes(searchLower))
    );
  }

  handleInsertOrUpdate() {
    const requestData = { ...this.formData };

    if (this.isCreateMode) {
      requestData.userid = this.getNextUserId();
      this.dataService.createUser(requestData)
        .then(() => {
          this.formData = {
            userid: '',
            password: '',
            email: ''
          };
          alert(`User created successfully.`);
          this.fetchUsers();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.dataService.updateUser(requestData)
        .then(() => {
          this.formData = {
            userid: '',
            password: '',
            email: ''
          };
          alert(`User updated successfully.`);
          this.fetchUsers();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  handleDelete(userId: any) {
    this.dataService.deleteUser(userId)
      .then(() => {
        this.fetchUsers();
        alert('User deleted successfully.');
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getNextUserId() {
    if (this.users.length === 0) {
      return '1';
    }

    const maxUserID = Math.max(...this.users.map((user) => +user.userid));
    return (maxUserID + 1).toString();
  }

  handleEdit(userId: any) {
    const userToEdit = this.users.find((user) => user.userid === userId);
    if (userToEdit) {
      this.selectedUserId = userId;
      this.selectedUserData = userToEdit;
      this.formData = { ...userToEdit };
      this.setCreateMode(false);
    }
  }

  renderPasswordCircles(password: string) {
    const circle = '⚫';
    return circle.repeat(password.length);
  }

  handleRead(user: any) {
    const data = `The Data of User ID: ${user.userid}\nEmail: ${user.email}\nPassword: ${user.password}`;
    window.alert(data);
  }

  setCreateMode(createMode: boolean) {
    this.isCreateMode = createMode;
  }
}
