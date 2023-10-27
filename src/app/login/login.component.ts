import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  login() {
    this.authService
      .login(this.username, this.password)
      .then(() => {
        this.router.navigate(['/user']);
      })
      .catch(error => {
        this.openDialog('Wrong Password', 'The password you entered is incorrect.');
      });
  }

  openDialog(title: string, message: string): void {
    this.dialog.open(DialogComponent, {
      data: { title, message },
    });
  }
}
