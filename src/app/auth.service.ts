import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9900'; // Your authentication API URL

  // Store the authentication token or user information, e.g., username
  private authToken: string | null = null;

  constructor(private router: Router) {
    // Check if a user is already authenticated (e.g., token in localStorage)
    this.authToken = localStorage.getItem('authToken');
  }

  // Method to log in a user
  login(username: string, password: string): Promise<void> {
    return axios.post(`${this.apiUrl}/login`, { username, password })
      .then(response => {
        // If login is successful, store the authentication token
        this.authToken = response.data.token;
        var token = response.data.token;
        // You can also store user information, e.g., username, in localStorage
        localStorage.setItem('authToken', token);
      });
  }

  // Method to log out a user
  logout(): void {
    // Clear the authentication token
    this.authToken = null;
    // Remove the token from localStorage
    localStorage.removeItem('authToken');

    // Navigate to the login page
    this.router.navigate(['/login']);
  }

  // Check if a user is authenticated
  isUserAuthenticated(): boolean {
    return !!this.authToken;
  }

  // Get the authentication token (useful for making authenticated API requests)
  getAuthToken(): string | null {
    return this.authToken;
  }
}
