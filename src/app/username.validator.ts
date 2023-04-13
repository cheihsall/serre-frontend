import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormControl } from '@angular/forms';
export class UsernameValidator {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null
    {


        if((control.value as string).startsWith(' ')){
            return {cannotContainSpace: true}
        }

        return null;
    }

    static ValidateString(control: FormControl) {
    let pattern = /^\w/; // can change regex with your requirement
    //if validation fails, return error name & value of true


    if (pattern.test(control.value)) {
        return { validString: true };
    }
    //otherwise, if the validation passes, we simply return null
    return null;
}

}
