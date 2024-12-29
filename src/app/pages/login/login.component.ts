import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnDestroy} from '@angular/core';
import { Credentials, LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnDestroy{

  private FormBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  private loginSubscription : Subscription | null = null;
  
  loginFormGroup = this.FormBuilder.group({
    'username': ['', [Validators.required]],
    'password': ['', [Validators.required]]
  });

  invalidCredentials = false;

  login() {
    this.loginSubscription = this.loginService.login(this.loginFormGroup.value as Credentials).subscribe({
      next: (result: User  | null | undefined) => {
        this.navigateHome();
      },
      error: error => {
        this.invalidCredentials = true;
      }
    })

  }
 navigateHome() {
  this.router.navigate(['home']);
 }
 
 ngOnDestroy(): void {
  this.loginSubscription.unsubscribe
   
 }

}  
