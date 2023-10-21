import { Component } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  address: string = '';
  message: string = '';
  responseMessage: string = '';
  success: boolean = false;

  constructor(private contactService: ContactService ) {}

  addContact() {
    const contactData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address,
      message: this.message
    };

    this.contactService.addContact(contactData).subscribe(
      (response) => {
        this.success = true;
        this.responseMessage = '';
      },
      (error) => {
        this.success = false;
        this.responseMessage = 'Failed to submit the contact form.';
      }
    );
  }
}
