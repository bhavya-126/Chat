import { AbstractControl, ValidatorFn } from "@angular/forms";

export function NotEqualValidator(control: AbstractControl){
    if(control.value.password === control.value.repeatPassword){
        return null;
    }
    return { NotEqualValidator: true};
}