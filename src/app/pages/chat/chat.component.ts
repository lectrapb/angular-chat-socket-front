import { Component, OnInit } from '@angular/core';
import {Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from 'src/app/models/message';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  private client: Client = new Client();
  
  connected: boolean = false;

  message: Message = new Message();
  messages: Message[] = [];

  constructor() { }

  ngOnInit(){

    this.client.webSocketFactory = function(){
       
         return new SockJS("http://localhost:8080/chat-websocket");
    }
    
    this.client.onConnect = (frame) =>{
      console.log(' Conectados '+ this.client.connected + ' : '+ frame); 
      this.connected = true;  
      
      this.client.subscribe('/chat/mensage', e =>{
            
           let message: Message = JSON.parse(e.body) as Message;
           message.date = new Date(message.date);
           this.messages.push(message);
           console.log(message);
           
      });
    }

    this.client.onDisconnect = (frame) =>{
      console.log(' Desconectados '+ !this.client.connected + ' : '+ frame); 
      this.connected = false;
    }
   
  
  }

  openConnection(){

    this.client.activate();
  }

  closeConnection(){

    this.client.deactivate();
  }

  sendMessage(): void{
     this.client.publish({destination: '/app/mensage', body: JSON.stringify(this.message)});
     this.message.text = '';
  }

}
