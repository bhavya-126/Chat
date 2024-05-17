import { Component, OnInit, inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Response } from '../interface/response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  httpService: HttpService = inject(HttpService);
  profile;
  ngOnInit(): void {
    this.httpService.getProfile(sessionStorage.getItem('token')).subscribe({
      next: (res: Response) => {
        this.profile = res.data;
        console.log(this.profile);
      },
      error: (err: Response) => {
        console.log(`Error: ${JSON.stringify(err)}`);
      },
    });
  }
}
