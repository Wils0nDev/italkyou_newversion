import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HashResponse, HashRequest } from '../models/hash.models';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor(
    private http: HttpClient,
  ) { }

  generateHash(request : HashRequest) : Observable<HashResponse>{
     return this.http.post<HashResponse>(
      `https://agentedev.inticousa.com:8009/api/mobile/user-generate-hash-login`,
      request
     )

  }
}
