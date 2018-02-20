import { Component } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder, FormArray, ValidatorFn } from '@angular/forms';
import { Customer } from './customer';
import 'rxjs/add/operator/debounceTime';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

function emailMatcher(c: AbstractControl) {
  let emailControl = c.get('email');
  let confirmControl = c.get('confirmEmail');
  if (emailControl.pristine || confirmControl.pristine) {
      return null;
  }
  if (emailControl.value === confirmControl.value) {
      return null;
  }
  return { 'match': true };
}

function ratingRange(min: number, max: number): ValidatorFn {
return (c: AbstractControl): {[key: string]: boolean} | null => {
      if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
          return{'range': true};
      }
      return null;
  }
}



@Component({
  selector: 'app-mm',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  customerForm: FormGroup;
  customer: Customer = new Customer();
  emailMessage: string;
  firstNameMessages: string;
  lastNameMessages: string;
  ratingMessage: string;

  get addresses(): FormArray {
      return <FormArray>this.customerForm.get('addresses');
  }

  private validationMessages = {
      required: 'Please enter your valid email id.',
      pattern: 'invalid email id.'
  };
  private fNameMessages = {
      required: 'Please enter your first name.',
      minlength: 'The first name must be longer than 3 characters.'
  };
  private lNameMesages = {
      required: 'Please enter your last name.',
      maxLength: 'The last name must be not longer than 10 characters.'
  };

  private ratingMessagesObj = {
      range: 'Please rate your experince from 1 to 5.'
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
      this.customerForm = this.fb.group({
          firstName: ['', [Validators.required, Validators.minLength(3)]],
          lastName: ['', [Validators.required, Validators.maxLength(50)]] ,
          emailGroup: this.fb.group({
              email: ['',  [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]')]],
              confirmEmail: ['', Validators.required],
          }, {validator: emailMatcher }),
          phone: '',
          notification: 'email',
          rating: ['', ratingRange(1, 5)],
          sendCatalog: true,
          addresses: this.fb.array([this.buildAddress() ])
      });


      this.customerForm.get('notification').valueChanges.// watch for radio buttons
      subscribe(value => this.setNotification(value));

      const emailControl = this.customerForm.get('emailGroup.email');
      emailControl.valueChanges.debounceTime(2500). // watch for email id change
      subscribe(value => this.setMessage(emailControl));

      const firstNameControl = this.customerForm.get('firstName');
      firstNameControl.valueChanges.debounceTime(1000).            // watch for First name
      subscribe(value => this.setfNameMessage(firstNameControl));

      const lastNameControl = this.customerForm.get('lastName');
      lastNameControl.valueChanges.                 // watch for last name
      subscribe(value => this.setLastNameMessages(lastNameControl));

      const ratingControl = this.customerForm.get('rating');
      ratingControl.valueChanges.
      subscribe(value => this.setRatingMessage(ratingControl)); // watch for rating

  }
  populateTestData(): void {
      this.customerForm.patchValue({
          firstName: 'Daya',
          lastName: 'shankar',
          emailGroup: {
              email: 'd@g.com',
                  confirmEmail: 'd@g.com'

          },
          phone: '',
          notification: 'email',
          rating: '4',
          sendCatalog: true
      });

  }
  save() {
      console.log(this.customerForm);
      console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  // function to set email validate message
  setMessage(c: AbstractControl): void {
          this.emailMessage = '';
          if ((c.touched || c.dirty) && c.errors) {
              this.emailMessage = Object.keys(c.errors).map(key =>
                   this.validationMessages[key]).join(' ');
          }
  }

  // function for first name message
  setfNameMessage(c: AbstractControl): void {
      this.firstNameMessages = '';
      if ((c.touched || c.dirty) && c.errors) {
          this.firstNameMessages = Object.keys(c.errors).map(key =>
          this.fNameMessages[key]).join('');
      }
  }
  // function for last name message
  setLastNameMessages(c: AbstractControl): void {
      this.lastNameMessages = '';
      if ((c.touched || c.dirty) && c.errors) {
          this.lastNameMessages = Object.keys(c.errors).map(key =>
          this.lNameMesages[key]).join('');
      }

  }

  // function for rating message
  setRatingMessage(c: AbstractControl): void {
      this.ratingMessage = '';
      if ((c.touched || c.dirty ) && c.errors) {
          this.ratingMessage = Object.keys(c.errors).map(key =>
              this.ratingMessagesObj[key]).join('');
          }
      }

   setNotification(notifyVia: string): void {
      const phoneControl = this.customerForm.get('phone');
      if (notifyVia === 'text') {
          // tslint:disable-next-line:max-line-length
          phoneControl.setValidators([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]);
      } else {
           phoneControl.clearValidators();
       }
  phoneControl.updateValueAndValidity();
}

// Function to build formcontrols
buildAddress(): FormGroup {
   return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      pin: ''
  });
}

}
