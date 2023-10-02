import { HttpClient, type HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, throwError, type Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  type User,
  type UserCredentials,
} from '../../store/user-feature/types';
import {
  loginUser,
  logoutUser,
} from '../../store/user-feature/user-feature.actions';
import {
  selectId,
  selectIsLogged,
} from '../../store/user-feature/user-feature.reducer';
import { type RegisterResponse, type TokenResponse } from '../types';
import { UiService } from '../ui/ui.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private get userLoginPath() {
    return '/login';
  }

  private get userRegisterPath() {
    return '/users';
  }

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store,
    private readonly uiService: UiService,
  ) {}

  getToken(loginFormData: UserCredentials): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(
        `${environment.apiUrl}${this.userLoginPath}`,
        loginFormData,
      )
      .pipe(catchError(error => this.handleError(error, this.uiService)));
  }

  registerUser(
    registerFormData: UserCredentials,
  ): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(
        `${environment.apiUrl}${this.userRegisterPath}`,
        registerFormData,
      )
      .pipe(catchError(error => this.handleError(error, this.uiService)));
  }

  loginUser(userData: User) {
    this.store.dispatch(loginUser({ payload: userData }));
  }

  logoutUser() {
    this.store.dispatch(logoutUser());
    this.uiService.showSuccessModal('You have logged out successfully');
  }

  handleError(error: HttpErrorResponse, uiService: UiService) {
    uiService.hideLoading();
    if (error.error.error) {
      uiService.showErrorModal(error.error.error);
      return throwError(() => error);
    }

    if (error.message) {
      uiService.showErrorModal(error.message);
    }

    return throwError(() => new Error(error.message));
  }

  getIsLogged() {
    return this.store.select(selectIsLogged);
  }

  getUserId() {
    return this.store.select(selectId);
  }
}
