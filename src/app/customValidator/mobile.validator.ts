import { AbstractControl } from '@angular/forms';

export function MobileValidator(control: AbstractControl) {
  const value = control.value;
  if (!value) return null;
  const regex = /[0-9]{10}/;
  return regex.test(value) ? null : { mobile: true };
}
