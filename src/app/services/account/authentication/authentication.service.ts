import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalService } from '../../local/local.service';
import { ITokenResponse } from '../../../data/models/app-token-response';
import { Subscription, take } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private localService: LocalService,
    private jwtHelperService: JwtHelperService
    ) { }

  login(username: string, password: string): Subscription {
    return this.http.post<ITokenResponse>('api/account/token',{ username, password})
      .pipe(take(1))
      .subscribe({
        next: x => {
          console.log(x);
          this.setSession(x);
        }
      });
  }
  
  logout(): void {
    this.localService.removeData('id_token');
    this.localService.removeData('expires_at');
  }

  isLoggedIn(): boolean {
    return Date.now() < this.getExpiration();
  }
  
  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getUserRole(): string {

    return this.jwtHelperService
      .decodeToken(this.localService.getData('id_token') ?? undefined)
      ?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? '';
  }

  getUsername(): string {
    return this.jwtHelperService
      .decodeToken(this.localService.getData('id_token') ?? undefined)
      ?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? '';
  }

  getAccessToken(): string {
    if (this.isLoggedOut()) return '';
    
    return this.localService.getData('id_token') ?? '';
  }

  private setSession(authResult: ITokenResponse): void {
    const expiresAt = Date.now() + authResult.expiration;

    this.localService.saveData('id_token', authResult.accessToken);
    this.localService.saveData('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  private getExpiration(): number {
      const expiration = this.localService.getData("expires_at");
      return +(expiration ?? Date.now());
  } 
}
