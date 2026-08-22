import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginRequest} from '../models/login-request.model';
import {Observable} from 'rxjs';
import {LoginResponse} from '../models/login-response.model';
import {CreateUserRequest} from '../models/create-user-request.model';
import {CreateUserResponse} from '../models/create-user-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly http = inject(HttpClient)

  private readonly uri = computed(() => `${environment.urlAuth}/users`);

  currentUser = signal<LoginResponse | null>(null);
  initials = computed(() => {
    const nameFirstLetter = this.currentUser()?.firstname.substring(0, 1);
    const lastnameFistLetter = this.currentUser()?.lastname.substring(0, 1);
    const initials = `${nameFirstLetter}${lastnameFistLetter}`;
    return initials.toUpperCase();
  });

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const url = `${this.uri()}/public/log-in`;
    return this.http.post<LoginResponse>(url, credentials);
  }

  createUser(newUser: CreateUserRequest): Observable<CreateUserResponse> {
    const url = `${this.uri()}/public/create-user`;
    return this.http.post<CreateUserResponse>(url, newUser);
  }

  checkSession() : Observable<LoginResponse> {
    const url = `${this.uri()}/me`;
    return this.http.get<LoginResponse>(url);
  }

  logout(): Observable<void> {
    const url = `${this.uri()}/logout`;
    return this.http.post<void>(url, {});
  }

  confirmAccount(token: string): Observable<string> {
    const url = `${this.uri()}/public/confirm-account/${token}`;
    return this.http.patch<string>(url, {}, { responseType: 'text' as 'json'});
  }
}
