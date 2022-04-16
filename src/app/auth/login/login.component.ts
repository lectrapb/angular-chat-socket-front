import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Constant } from '../../util/constant';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  public formSubmited = false;

  public loginForm = this.fb.group({
     email: [localStorage.getItem(Constant.LS_USER_EMAIL) || '', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.minLength(5)]], 
     remember: [false, Validators.required]
  });

  constructor(private fb:FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.loginOutUser();
  }


  login(){
    this.formSubmited = true;
   
    
    if(this.loginForm.invalid){
      Swal.fire('Error', 'Invalid Data', 'error');
      return;
    }
    if(this.loginForm.get('remember')?.value){
      localStorage.setItem(Constant.LS_USER_EMAIL,this.loginForm.get('email')?.value);
    }else{
      localStorage.removeItem(Constant.LS_USER_EMAIL)
    }
    this.userService.validateUser(this.loginForm.value);
    this.router.navigateByUrl('/dashboard/chat')
  }

  fieldInvalid( field: string): boolean {
  
    if( this.loginForm.get(field)?.invalid  && this.formSubmited){
       return true;
    }
    return  false;
  }

 



}
