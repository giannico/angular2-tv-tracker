import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthUser } from '../../../../core';

export interface UpdateEmailFormData {
    email: string;
};

@Component({
    selector: 'update-email-form',
    templateUrl: './update-email-form.component.html'
})
export class UpdateEmailFormComponent implements OnInit {
    @Input() errorMessage: string;
    @Input() user: AuthUser;
    @Output() emailUpdate: EventEmitter<UpdateEmailFormData> = new EventEmitter<UpdateEmailFormData>();

    formData: UpdateEmailFormData = {
        email: null
    };

    constructor() {}

    ngOnInit() {
        if (this.user) {
            this.formData.email = this.user.email;
        }
    }

    // Don't watch for changes, because when the auth event fires after an email change
    // the content of the event still has the original email. As a result, this would
    // cause the form to switch back to the original email, adding confusion.
    // ngOnChanges(changes: SimpleChanges) {
    //     const userChange: SimpleChange = changes['user'];

    //     if (userChange != null) {
    //         const newUser: AuthUser = userChange.currentValue;
    //         this.formData.email = newUser.email;
    //     }
    // }

    submitHandler(formData: UpdateEmailFormData) {
        this.errorMessage = null;
        this.emailUpdate.emit(formData);
    }
}
