import { Component, OnInit, inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Response } from '../interface/response';
import { ChatService } from '../services/chat.service';
import { User } from '../interface/user';
import { FormBuilder } from '@angular/forms';
import { MessageResponse } from '../interface/message';
interface userResponse {
  data: User[];
  statusCode: number;
  message: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  httpService: HttpService = inject(HttpService);
  chatService: ChatService = inject(ChatService);
  router: Router = inject(Router);
  id: string;
  users: User[];
  allUsers: User[];
  formBuilder: FormBuilder = inject(FormBuilder);
  searchForm = this.formBuilder.group({
    searchTxt: [''],
  });
  constructor() {
    this.getAllUsers();
    // this.getUsers();
  }
  ngOnInit() {}

  onSearch() {
    if (!this.searchForm.value.searchTxt) {
      this.getUsers();
      return;
    }
    this.httpService
      .getUser(sessionStorage.getItem('token'), this.searchForm.value.searchTxt)
      .subscribe({
        next: (res: userResponse) => {
          this.users = res.data;
          console.log(this.users);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  logout() {
    let token = sessionStorage.getItem('token');

    this.httpService.logout(token).subscribe({
      next: (res: Response) => {
        console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
        sessionStorage.removeItem('token');
        this.router.navigate(['/LogIn']);
      },
      error: (err: Response) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
          // footer: '<a href="#">Why do I have this issue?</a>',
        });
      },
    });
  }
  addChat(email: string) {
    this.chatService
      .addChat(email)
      .then((res) => {
        console.log('chat added', res);
        this.id = res;
      })
      .catch((err) => {
        console.log('error occuered', err);
      });
  }
  sendMsg() {
    this.chatService
      .sendMsg('bhavya@chicmic.co.in', 'hello', 1, '', '')
      .then((res) => console.log('msg sent'));
  }
  getChat() {
    this.chatService.previousMsg(this.id, 1).then((res) => {
      console.log(res);
    });
  }
  getAllUsers() {
    this.httpService.getUser(sessionStorage.getItem('token')).subscribe({
      next: (res: userResponse) => {
        this.allUsers = res.data;
        console.log(this.allUsers);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getUsers() {
    this.chatService
      .getUsers()
      .then((res) => {
        this.users = res.data;
        console.log('users are ', this.users);
      })
      .catch((err) => console.log(err));
  }
}
