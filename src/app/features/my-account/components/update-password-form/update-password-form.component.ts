import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { AuthUser } from '../../../../core';

export interface UpdatePasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

@Component({
    selector: 'update-password-form',
    templateUrl: './update-password-form.component.html'
})
export class UpdatePasswordFormComponent implements OnInit {
    @Input() errorMessage: string;
    @Input() user: AuthUser;
    @Output() passwordUpdate: EventEmitter<UpdatePasswordFormData> = new EventEmitter<UpdatePasswordFormData>();

    formData: UpdatePasswordFormData;

    ////////////////////

    constructor() {}

    ngOnInit() {
        this.resetForm();
    }

    submitHandler(formData: UpdatePasswordFormData): void {
        this.errorMessage = null;

        if (formData.newPassword !== formData.confirmPassword) {
            this.errorMessage = 'New and confirmation passwords must match.';
            return;
        }

        this.passwordUpdate.emit(formData);
    }

    ////////////////////

    private resetForm(): void {
        this.errorMessage = null;
        this.formData = this.getBlankFormData();
    }

    private getBlankFormData(): UpdatePasswordFormData {
        return {
            currentPassword: null,
            newPassword: null,
            confirmPassword: null
        };
    }
}
