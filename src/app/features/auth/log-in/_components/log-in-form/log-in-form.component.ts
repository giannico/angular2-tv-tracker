import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface LogInFormData {
    email: string;
    password: string;
};

@Component({
    selector: 'log-in-form',
    templateUrl: './log-in-form.component.html',
    styleUrls: ['./log-in-form.css']
})
export class LogInFormComponent {
    @Input() errorMessage?: string;
    @Output() logIn: EventEmitter<any> = new EventEmitter<any>();

    formData: LogInFormData = {
        email: null,
        password: null
    };

    constructor() {}

    submitHandler() {
        this.logIn.emit(this.formData);
    }
}
