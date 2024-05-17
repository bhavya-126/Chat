import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { urls } from '../url';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  
  constructor() {
    this.startConnection();
    this.connection.on('refresh', () => {
      console.log('refresh called');
    });
    this.connection.on('receiveMessage', (data) => {
      console.log(data);
    });

    // this.connection.invoke('getUsers').then((res) => {
    //   this.users = res;
    // });
  }

  public connection: signalR.HubConnection | undefined;

  private async startConnection() {
    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(
          urls.BASE_URL +
            urls.CHAT_HUB +
            `?access_token=${sessionStorage.getItem('token')}`,
          {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
          }
        )
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      await this.connection.start();
      console.log('SignalR Connected');
    } catch (error) {
      console.log('ERROR IS : ' + error);
    }
  }

  // add chat  addchat(string email)
  public async addChat(email: string) {
    return this.connection.invoke('addchat', email);
  }

  // send msg sendMessage(string email,string msg,int type,string url,string fileName)
  public async sendMsg(
    email: string,
    msg: string,
    type,
    url: string,
    fileName: string
  ) {
    return this.connection.invoke(
      'sendMessage',
      email,
      msg,
      type,
      url,
      fileName
    );
  }

  // previous msg previousMessages(string MapId,int pageNumber)
  public async previousMsg(chatId: string, skipMessages: number) {
    return this.connection.invoke('previousMessages', chatId, skipMessages);
  }

  // getUsers() to get all users with online status
  public async getUsers() {
    return this.connection.invoke('getUsers');
  }
}
