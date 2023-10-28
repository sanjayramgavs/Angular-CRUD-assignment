import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9900'; 
  private authToken: string | null = null;
  constructor(private router: Router) {    
    this.authToken = localStorage.getItem('authToken');
  }
  login(username: string, password: string): Promise<void> {
    return axios.post(`${this.apiUrl}/login`, { username, password })
      .then(response => {
        
        this.authToken = response.data.token;
        var token = response.data.token;
        
        localStorage.setItem('authToken', token);
      });
  }  
  logout(): void { 
    this.authToken = null;
     localStorage.removeItem('authToken');
     this.router.navigate(['/login']);
  }
  isUserAuthenticated(): boolean {
    return !!this.authToken;
  }
 getAuthToken(): string | null {
    return this.authToken;
  }
}
