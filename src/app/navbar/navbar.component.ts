import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService,private router: Router) {}

  isUserAuthenticated(): boolean {
    return this.authService.isUserAuthenticated();
  }

  logout(): void {
    // Remove the token from localStorage
    localStorage.removeItem('authToken');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
