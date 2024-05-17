import { AbstractControl } from "@angular/forms";

export function equalValidator(control: AbstractControl){
    if(control.value.oldPassword === control.value.newPassword){
        return {equal:true};
    }
    return false;
}