import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Response } from '../interface/response';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  httpService: HttpService = inject(HttpService);
  data: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  onSubmit() {
    console.log(this.data.value);
    let successRecord: number = 200;
    this.httpService.forgotPassword(this.data.value.email).subscribe({
      next: (res: Response) => {
        console.log(res);
        if (res.statusCode === 200) {
          // sessionStorage.setItem('token', res?.data?.token);
          console.log(res);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.message,
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
