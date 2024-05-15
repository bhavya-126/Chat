import { inject } from '@angular/core';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Response } from '../interface/response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  loginData: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  signInData: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    // repeatPassword: ['', [Validators.required]],
    phoneNo: [0, [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
  });
  httpService: HttpService = inject(HttpService);
  onLogIn() {
    this.httpService.logIn(this.loginData.value).subscribe({
      next: (res: Response) => {
        if (res.statusCode === 200) {
          localStorage.setItem('token', res?.data?.token);
          console.log(res);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.message,
            showConfirmButton: false,
            timer: 1500
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
      error: (err: { message: string }) => {
        // console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      },
    });
  }
  onSignUp() {
    console.log(this.signInData.value);
    this.httpService.signIn(this.signInData.value).subscribe({
      next: (res: Response) => {
        // console.log(res);
        if (res.statusCode === 200) {
          localStorage.setItem('token', res?.data?.token);
          console.log(res);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.message,
            showConfirmButton: false,
            timer: 1500
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      },
    });
  }
}
