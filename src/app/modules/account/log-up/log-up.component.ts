import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, FormsModule, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { Router } from '@angular/router';
import { LogUpService } from 'src/app/services/account/log-up/log-up.service';
import { Subject, Observable, map, of, delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-log-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
  ],
  templateUrl: './log-up.component.html',
  styleUrls: ['./log-up.component.css']
})
export class LogUpComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    username: new FormControl<string>('', [], [ this.existingUsernameValidator() ]),
    password: new FormControl<string>(''),
    email: new FormControl<string>('', [Validators.email], [ this.existingEmailValidator() ])
  });

  _onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private logupService: LogUpService,
    private router: Router
    ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  sendForm(): void {

    if (!this.form.valid) return;

    this.logupService
      .logup({
        username: this.form.value['username'],
        password: this.form.value['password'],
        email: this.form.value['email']
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/account/login');
        }
      });
  }

  existingUsernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

      if (control.invalid) return of(null);

      return of(control.value).pipe(delay(500),
        switchMap(value => this.logupService.checkAvailableUsername(value).pipe(map(
          (available: boolean) => {
            return (!available) ? { 'unavailable': true } : null;
          }))
        )
      );
    };
  }

  existingEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

      if (control.invalid) return of(null);

      return of(control.value).pipe(delay(500),
        switchMap(value => this.logupService.checkAvailableEmail(value).pipe(map(
          (available: boolean) => {
            return (!available) ? { 'unavailable': true } : null;
          }))
        )
      );
    };
  }
}