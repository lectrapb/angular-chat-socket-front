import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from '../guards/auth.guard';



const routes: Routes = [
  { path:'dashboard', 
    component:PagesComponent,
    canActivate: [AuthGuard],
    children: [      
      { path: 'chat', component: ChatComponent}  
    ] 
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
