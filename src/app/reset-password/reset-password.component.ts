import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Response } from '../interface/response';
import { NotEqualValidator } from '../customValidator/notEqual.validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  // router:Router = inject(Router);
  httpService: HttpService = inject(HttpService);
  formBuilder: FormBuilder = inject(FormBuilder);
  resetForm: FormGroup = this.formBuilder.group(
    {
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    },
    { validators: [NotEqualValidator] }
  );
  ngOnInit() {
    this.token = this.activeRoute.snapshot.queryParamMap.get('token');
  }
  onChange() {
    console.log(this.resetForm);

    this.httpService
      .changePassword(this.resetForm.value.password, this.token)
      .subscribe({
        next: (res: Response) => {
          if (res.statusCode === 200) {
            localStorage.setItem('token', res?.data?.token);
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
            });
          }
        },
        error: (err: Response) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          });
        },
      });
  }
}
