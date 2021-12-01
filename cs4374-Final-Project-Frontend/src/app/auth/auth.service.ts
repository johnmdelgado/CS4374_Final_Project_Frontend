import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { RegisterPayload } from './register-payload';
import { Observable } from 'rxjs';
import { LoginPayload } from './login-payload';
import { JwtAuthResponse } from './jwt-auth-response';
import {LocalStorageService} from 'ngx-webstorage';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/';
  private registerApiPath = '';
  private loginApiPath = '';

  constructor(private httpClient: HttpClient,private localStorageService: LocalStorageService) { }

  register(registerPayload: RegisterPayload): Observable<any> {
    this.registerApiPath = this.url + 'api/auth/signup';
    console.log('Here is the register post url: ' + this.registerApiPath );
    return this.httpClient.post(this.registerApiPath, registerPayload);
  }

  login(loginPayload: LoginPayload):Observable<boolean> {
    this.loginApiPath = this.url + 'api/auth/login';
    console.log('Here is the login post url: ' + this.loginApiPath);
    return this.httpClient.post<JwtAuthResponse>(this.loginApiPath, loginPayload).pipe(map(data => {
      this.localStorageService.store('authenticationToken', data.authenticationToken);
      this.localStorageService.store('username', data.username);
      return true;
    }));
  }

  isAuthenticated(): Boolean{
    return this.localStorageService.retrieve('username') != null;
  }

  logout(){
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
  }
}
