import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Response } from '../interface/response';
import { equalValidator } from '../customValidator/equal.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  httpService: HttpService = inject(HttpService);
  formBuilder: FormBuilder = inject(FormBuilder);
  passwordData: FormGroup = this.formBuilder.group(
    {
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    },
    {
      validators: [equalValidator],
    }
  );
  get oldPass() {
    return this.passwordData.controls['oldPassword'];
  }
  get newPass() {
    return this.passwordData.controls['newPassword'];
  }
  change() {
    this.httpService
      .changePassword(this.passwordData.value, sessionStorage.getItem('token'))
      .subscribe({
        next: (res: Response) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
