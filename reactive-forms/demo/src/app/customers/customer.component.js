"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var customer_1 = require("./customer");
function ratingRange(min, max) {
    return function (c) {
        if (c.value != undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        return null;
    };
}
function emailMatcher(c) {
    var emailControl = c.get('email');
    var confirmControl = c.get('confirmEmail');
    if ((confirmControl.pristine || emailControl.pristine) ||
        emailControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
}
var CustomerComponent = (function () {
    function CustomerComponent(fb) {
        this.fb = fb;
        this.customer = new customer_1.Customer();
    }
    CustomerComponent.prototype.ngOnInit = function () {
        this.customerForm = this.fb.group({
            firstName: [
                { value: '', disabled: false },
                [forms_1.Validators.required, forms_1.Validators.minLength(3)]
            ],
            lastName: [
                { value: '', disabled: false },
                [forms_1.Validators.required, forms_1.Validators.maxLength(50)]
            ],
            emailGroup: this.fb.group({
                email: [
                    '',
                    [forms_1.Validators.required, forms_1.Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/)]
                ],
                confirmEmail: [
                    '',
                    [forms_1.Validators.required]
                ],
            }, { validator: emailMatcher }),
            phone: '',
            notification: 'email',
            rating: [
                '',
                ratingRange(1, 5)
            ],
            sendCatalog: { value: false, disabled: false },
        });
    };
    CustomerComponent.prototype.populateTestData = function () {
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
    };
    CustomerComponent.prototype.save = function () {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    };
    CustomerComponent.prototype.setNotification = function (notifyVia) {
        var phoneControl = this.customerForm.get('phone');
        if (notifyVia === 'text') {
            phoneControl.setValidators(forms_1.Validators.required);
        }
        else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    };
    return CustomerComponent;
}());
CustomerComponent = __decorate([
    core_1.Component({
        selector: 'my-signup',
        templateUrl: './app/customers/customer.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], CustomerComponent);
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map