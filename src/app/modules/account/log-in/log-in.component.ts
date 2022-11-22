import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { AuthenticationService } from 'src/app/services/account/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
  ],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl<string>(''),
    password: new FormControl<string>('')
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  sendForm(): void {

    if (!this.form.valid) return;

    this.authService
    .login(this.form.value['username'] ?? '', this.form.value['password'] ?? '')
    .add(() => {
      if (this.authService.isLoggedIn()) {

        this.router.navigateByUrl('');

      } else {
        this.form.setErrors({ unauthenticated: true });
      }
    });
  }
}
