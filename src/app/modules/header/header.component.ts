import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/services/account/authentication/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isLoggedOut(): boolean {
    return !this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

  userInRole(role: string): boolean {
    return this.authService.getUserRole() == role && this.authService.isLoggedIn();
  }
}
