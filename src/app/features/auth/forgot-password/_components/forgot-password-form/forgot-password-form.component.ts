import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ForgotPasswordFormData {
    email: string;
};

@Component({
    selector: 'forgot-password-form',
    templateUrl: './forgot-password-form.component.html',
    styleUrls: ['./forgot-password-form.css']
})
export class ForgotPasswordFormComponent {
    @Input() errorMessage?: string;
    @Output() forgotPassword: EventEmitter<any> = new EventEmitter<any>();

    formData: ForgotPasswordFormData = {
        email: null
    };

    constructor() {}

    submitHandler() {
        this.forgotPassword.emit(this.formData);
    }
}
