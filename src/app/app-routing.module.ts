import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './pages/chat/chat.component';
import { LoginComponent } from './auth/login/login.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path:'', 
    component:PagesComponent,
    children: [
        
      { path: 'home', component: HomeComponent},
      { path: 'chat', component: ChatComponent},
      { path: '', pathMatch:'full', redirectTo: 'home'}
    ] 
  },
  { path: 'login', component: LoginComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
