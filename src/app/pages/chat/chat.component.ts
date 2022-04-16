import { Component, OnInit } from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import {Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from 'src/app/models/message';
import { Constant } from '../../util/constant'



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
  writing: string ='';
  clientId: string = 'id-'+uuidv4();

  getUserType():string{
    return Constant.TYPE_NEW_USER;
  }

  getMessageType():string{
    return Constant.TYPE_MESSAGE;
  }
 
 

  constructor() {

      this.clientId = 'id-'+ new Date
   }

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

           if(!this.message.color && message.type == Constant.TYPE_NEW_USER
              && this.message.username == message.username){
                 this.message.color = message.color;
              } 

           this.messages.push(message);
           console.log(message);
           
      });
      //Escucha escritura
      this.client.subscribe('/chat/escribiendo', e =>{
            
          this.writing = e.body;
          setTimeout(() =>this.writing = '', 3000);
        
      });

      this.client.subscribe('/chat/historial/'+ this.clientId, e =>{
         
        const record = JSON.parse(e.body) as Message[];
        this.messages = record.map( m =>{
            m.date = new Date(m.date);
            return m;
        }).reverse();
      });

      this.client.publish({ destination: '/app/historial', body: this.clientId});


      this.message.type =  Constant.TYPE_NEW_USER;
      this.client.publish({destination: '/app/mensage', body: JSON.stringify(this.message)});
    }

    this.client.onDisconnect = (frame) =>{
      console.log(' Desconectados '+ !this.client.connected + ' : '+ frame); 
      this.connected = false;
      this.message = new Message();
      this.messages = [];
    }
   
  
  }

  openConnection(){

    this.client.activate();
  }

  closeConnection(){

    this.client.deactivate();
  }

  sendMessage(): void{
     this.message.type = Constant.TYPE_MESSAGE;
     this.client.publish({destination: '/app/mensage', body: JSON.stringify(this.message)});
     this.message.text = '';
  }

  writingEvent():void{
    this.client.publish({destination: '/app/escribiendo', body: this.message.username });
  }

}
