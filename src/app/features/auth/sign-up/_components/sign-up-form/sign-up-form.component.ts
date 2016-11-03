import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
};

@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.css']
})
export class SignUpFormComponent {
  @Input() errorMessage?: string;
  @Output() signUp: EventEmitter<any> = new EventEmitter<any>();

  formData: SignUpFormData = {
    name: null,
    email: null,
    password: null
  };

  constructor() { }

  submitHandler() {
    this.signUp.emit(this.formData);
  }
}
