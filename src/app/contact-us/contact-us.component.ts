import { Component } from '@angular/core';
import { ContactService } from '../contact.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm: FormGroup;
  responseMessage: string = '';
  success: boolean = false;

  constructor(private contactService: ContactService, private dialog: MatDialog, private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      address: [''],
      message: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      // Form validation is successful, proceed to add contact
      const contactData = this.contactForm.value;

      this.contactService.addContact(contactData).subscribe(
        (response) => {
          this.success = true;
          this.responseMessage = '';
          this.openSuccessDialog('Success', 'We will contact you later.');
          this.contactForm.reset();
        },
        (error) => {
          this.success = false;
          this.responseMessage = 'Failed to submit the contact form.';
        }
      );
    }
  }

  openSuccessDialog(title: string, message: string) {
    this.dialog.open(DialogComponent, {
      data: { title, message },
    });
  }

  isInvalid(controlName: string) {
    const control = this.contactForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  isFormValid() {
    return this.contactForm.valid;
  }
}
