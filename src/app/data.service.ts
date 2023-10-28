import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:9900';

  constructor() {}

  getAllUsers() {
    return axios.get(`${this.apiUrl}/getAll`);
  }
  
  createUser(user: any) {
    return axios.post(`${this.apiUrl}/insert`, user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  updateUser(user: any) {
    return axios.put(`${this.apiUrl}/update`, user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteUser(userId: any) {
    return axios.delete(`${this.apiUrl}/delete?uid=${userId}`);
  }
}
