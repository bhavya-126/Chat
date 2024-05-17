import { AbstractControl } from '@angular/forms';

export function passwordValidator(control: AbstractControl) {
  let value = control.value;
  if (!value) return null;
  const hasUpperCase = /[A-Z]+/.test(value);

  const hasLowerCase = /[a-z]+/.test(value);

  const hasNumeric = /[0-9]+/.test(value);

  const length = value.length>8;

  const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && length;

  return !passwordValid ? { passwordStrength: true } : null;
}
