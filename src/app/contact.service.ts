import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:9900'; // Replace with your Express API URL

  constructor() {}

  addContact(contactData: any): Observable<any> {
    return new Observable((observer) => {
      axios
        .post(`${this.apiUrl}/addContact`, contactData)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
