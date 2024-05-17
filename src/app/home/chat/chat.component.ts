import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message, MessageResponse } from 'src/app/interface/message';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  formBuilder:FormBuilder = inject(FormBuilder);
  newMessage:FormGroup = this.formBuilder.group({
    message:['', Validators.required]
  })
  chatService:ChatService = inject(ChatService);
  id:string;
  receiverEmail:string;
  chat:Message[]=[];
  
  ngOnInit(){
    this.activeRoute.queryParamMap.subscribe((param)=>{
      this.receiverEmail = param.get('user');
      this.addChat();
    });
  }

  async addChat() {
    // console.log("add chat method called");
    
    await this.chatService
      .addChat(this.receiverEmail)
      .then((res) => {
        console.log('chat added', res);
        this.id = res;
      })
      .catch((err) => {
        console.log('error occuered', err);
      });
      this.getChat();
  }
  sendMsg() { 
    let msg= this.newMessage.value.message
    this.newMessage.controls['message'].setValue('');
    this.chatService
      .sendMsg(this.receiverEmail, msg, 1, '', '')
      .then((res) => console.log('msg sent', res));
    
  }
  getChat() {
    this.chatService.previousMsg(this.id, this.chat.length).then((res:MessageResponse) => {
      this.chat = res.data;
      console.log(res.data);
    });
  }
}
