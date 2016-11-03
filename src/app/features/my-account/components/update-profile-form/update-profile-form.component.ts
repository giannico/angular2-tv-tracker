import { Component, EventEmitter, Input, OnChanges,
         Output, SimpleChange, SimpleChanges } from '@angular/core';

import { AuthUser } from '../../../../core';

export interface UpdateProfileFormData {
    name: string;
};

@Component({
    selector: 'update-profile-form',
    templateUrl: './update-profile-form.component.html'
})
export class UpdateProfileFormComponent implements OnChanges {
    @Input() user: AuthUser;
    @Output() profileUpdate: EventEmitter<UpdateProfileFormData> = new EventEmitter<UpdateProfileFormData>();

    formData: UpdateProfileFormData = {
        name: null
    };

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        const userChange: SimpleChange = changes['user'];

        if (userChange != null) {
            const newUser: AuthUser = userChange.currentValue;
            this.formData.name = newUser.name;
        }
    }

    submitHandler(formData: UpdateProfileFormData) {
        this.profileUpdate.emit(formData);
    }
}
