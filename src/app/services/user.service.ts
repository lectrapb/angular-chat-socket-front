import { Injectable } from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import { ValidateForm } from '../interfaces/validate-form';
import { Constant } from '../util/constant';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  validateUser( formData: ValidateForm){
     
     const user = formData.email.split('@');
     console.log(user);
     
     localStorage.setItem(Constant.LS_USER_NAME , user[0]); 
     localStorage.setItem(Constant.LS_USER_TOKEN, uuidv4());
     
  }

  validateToken():Observable<boolean>{

      const token = localStorage.getItem(Constant.LS_USER_TOKEN) || '';
      if(token){
        return of(true);
      }else{
        return of(false);
      }
  }

  loginOutUser(){

     localStorage.removeItem(Constant.LS_USER_TOKEN);
  }
  
}
