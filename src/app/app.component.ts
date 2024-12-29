import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet]
})
export class AppComponent implements OnDestroy{
 private router = inject(Router);
 loginService = inject(LoginService);

 private logoutSubscription : subscription | null = null

 logout() {
  this.logoutSubscription = this.loginService.logout().subscribe({
    next: _ => {
      this.navigateToLogin();
    },
    error: _ => {
      this.navigateToLogin
    }
  }) 


 }

 navigateToLogin() {
  this.router.navigate(['login']);
 }
 
 navigateHome() {
  this.router.navigate(['home']);
 }
  
 ngOnDestroy(): void {
   this.logoutSubscription.unsubscribe();
 }
} 
