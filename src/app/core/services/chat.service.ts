import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Controller } from '../../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient,
  ) { }

  ChatListAll = (request: any): Observable<any> => {
    return this.http
      .post<any>(
        environment.serverUriApi + Controller.ChatAllList , request
      )
  };
}
