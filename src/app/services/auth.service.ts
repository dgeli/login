import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey =  'AIzaSyDZQOGX7cbTu6ivQ4gDRaS3VWyjIu5AnFo';

  userToken: string;

  constructor(private http: HttpClient) {

   }

   logout() {
      localStorage.removeItem('token');
   }

   login(user: UserModel) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}/accounts:signInWithPassword?key=${this.apiKey}`, authData).pipe(map (resp => {
      this.saveToken(resp['idToken']);
      return resp;
    })
    );
   }

   newUser(user: UserModel) {
     const authData = {
       email: user.email,
       password: user.password,
       returnSecureToken: true
     };
     return this.http.post(`${this.url}/accounts:signUp?key=${this.apiKey}`, authData).pipe(map (resp => {
       this.saveToken(resp['idToken']);
       return resp;
     })
     );
   }

  saveToken(idToken: string) {
      this.userToken = idToken;
      localStorage.setItem('token', idToken);

      const today = new Date();
      today.setSeconds(3600);
      localStorage.setItem('expires', today.getTime().toString());

   }

   readToken() {
    if (localStorage.getItem('token')) {
        this.userToken = localStorage.getItem('token');
    // tslint:disable-next-line:no-trailing-whitespace
    } else { 
        this.userToken = '';
      }
    return this.userToken;
    }

    isAuthenticated(): boolean {
      // tslint:disable-next-line:no-conditional-assignment
      if (this.userToken.length === 0) {
        return false;
      }
      const expires = Number(localStorage.getItem('expires'));
      const expiresDate = new Date();
      expiresDate.setTime(expires);

      if (expiresDate > new Date() ) {
        return true;
      } else {
        return false;
      }
      }
  }
