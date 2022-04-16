import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { PagesRoutingModule } from './pages-routing.module';
import { ChatComponent } from './chat/chat.component';
import { PagesComponent } from './pages.component';
import { ComponentModule } from '../components/component.module';





@NgModule({
  declarations: [
    ChatComponent,
    PagesComponent
  ],
  exports:[
    ChatComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PagesRoutingModule,
    ComponentModule
  ]
})
export class PagesModule { }
