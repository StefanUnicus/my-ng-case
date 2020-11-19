import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt/lib/jwthelper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_PATH: 'http://localhost:5000'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  CURRENT_USER = 'currentUser'
  TOKEN = 'access_token'

  jwthelp = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(username: String, password: String): Observable<any> { //not finalized and thus lacks the right http address.
    return this.http.post<any>('http://localhost:5000/', {username, password});
  }

  registerToken(token: string){
    localStorage.setItem(this.TOKEN, token);
  }

  removeToken(){
    localStorage.removeItem(this.TOKEN);
  }

  logout() {
    localStorage.clear();
  }

  isUserLoggedIn() {
    console.log('isUserLoggedIn');
    let token = localStorage.getItem(this.TOKEN);

    if (!token) return false;

    else if (this.jwthelp.isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  }
}
