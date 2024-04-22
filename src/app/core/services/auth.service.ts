import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginUser, SessionBody, SessionResponse, User, UserAddBody, UserAddResponse, UserResponse } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

        userLogin(request : LoginUser){
        //  sessionStorage.setItem('prueba','hola que tal');
            return this.http.post<UserResponse>(`https://agentedev.inticousa.com:8009/api/mobile/user-login`, request)
            
        }

       userAdd(request : UserAddBody){
        //  sessionStorage.setItem('prueba','hola que tal');
          return this.http.post<UserAddResponse>(`https://developers.italkyou.com:445/api/v1/user-add`, request)
            
      }

      sessionAdd(request:SessionBody){
        return this.http.post<any>(`https://developers.italkyou.com:445/api/v1/session-add`, request)
        .pipe(map(sesion =>{
             const { data } = sesion
             
            if (sesion && data.session_key) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('ci_session', JSON.stringify(data.session_key));
                //this.currentUserSubject.next(user);
            }
            return sesion;
        }))

      }
  

    login(email: string, password: string) {
        console.log({email,password})
        return this.http.post<any>(`/users/authenticate`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
