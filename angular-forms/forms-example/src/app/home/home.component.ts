import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from '../models/employee.model';
import { FormPoster } from '../services/form-poster.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  languages: string[];

  model = new Employee('', '', true, 'w2', 'default');
  hasPrimaryLanguageError: boolean;
  
  constructor(private formPoster: FormPoster) { }

  firstNameToUpperCase(name: string): void {
    if (name.length > 0) {
      this.model.firstName = name.substr(0, 1).toLocaleUpperCase() + (name.substr(1).toLocaleLowerCase() || '');
    } else {
      this.model.firstName = name;
    }
  }

  submitForm(form: NgForm) {
    this.validatePrimaryLanguage(this.model.primaryLanguage);
    if (this.hasPrimaryLanguageError)
      return;

    this.formPoster.postEmployeeForm(this.model)
      .subscribe(
        data => console.log('success: ', data),
        err => console.log('error: ', err),
        () => console.log('post completed')
      );
  }

  validatePrimaryLanguage(language: string): void {
    if (language === 'default') {
      this.hasPrimaryLanguageError = true;
    } else {
      this.hasPrimaryLanguageError = false;
    }
  }

  ngOnInit() {
    this.formPoster.getLanguages()
      .subscribe(
        languages => this.languages = languages,
        err => console.log(err.message)
      );
  }
}
