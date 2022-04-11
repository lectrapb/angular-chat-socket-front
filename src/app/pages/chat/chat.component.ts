import { Component, OnInit } from '@angular/core';
import {Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  private client: Client = new Client();
  
  connected: boolean = false;

  constructor() { }

  ngOnInit(){

    this.client.webSocketFactory = function(){
       
         return new SockJS("http://localhost:8080/chat-websocket");
    }
    
    this.client.onConnect = (frame) =>{
      console.log(' Conectados '+ this.client.connected + ' : '+ frame); 
      this.connected = true;     
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

}
