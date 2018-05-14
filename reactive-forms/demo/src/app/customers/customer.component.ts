import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Customer } from './customer';

function ratingRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
        if (c.value != undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        return null;
    };
}

function emailMatcher(c: AbstractControl): {[key: string]: boolean } | null {
    let emailControl = c.get('email');
    let confirmControl = c.get('confirmEmail');
    if ( (confirmControl.pristine || emailControl.pristine) ||
        emailControl.value === confirmControl.value
    ) {
        return null
    }
    return { 'match': true };
}

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customerForm: FormGroup;
    customer: Customer = new Customer();
    emailMessage: string;

    private validationMessages = {
        require: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.',
    };

    constructor(
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.customerForm = this.fb.group({
            firstName: [
                {value: '', disabled: false},
                [Validators.required, Validators.minLength(3)]
            ],
            lastName: [
                {value: '', disabled: false},
                [Validators.required, Validators.maxLength(50)]
            ],
            emailGroup: this.fb.group({
                email: [
                    '',
                    [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/)]
                ],
                confirmEmail: [
                    '',
                    [Validators.required]
                ],
            }, { validator: emailMatcher }),
            phone: '',
            notification: 'email',
            rating: [
                '',
                ratingRange(1, 5)
            ],
            sendCatalog: {value: false, disabled: false},
        });

        // watches for changes on the notification button
        this.customerForm.get('notification')
            .valueChanges
            .subscribe((value: string ): void => {
                console.log(value);
                this.setNotification(value)
            });

        // email watcher
        const emailControl = this.customerForm.get('emailGroup.email');
        emailControl.valueChanges.subscribe((value: string) =>
            this.setMessage(emailControl));
    }

    setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(key =>
                this.validationMessages[key]).join(' ');
        }
    }

    populateTestData(): void {
        this.customerForm.setValue({
            firstName: 'mike',
            lastName: 'm',
            email: 'mike@mail.com',
            sendCatalog: false
        });
        this.customerForm.patchValue({
            firstName: 'Bobbie',
            lastName: 'Lou'
        });
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }

    setNotification(notifyVia: string): void {
        const phoneControl = this.customerForm.get('phone');
        if ( notifyVia === 'text' ) {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        
        phoneControl.updateValueAndValidity();
    }
}
