import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, throwError } from 'rxjs';
import { Upload } from 'src/app/store/upload-feature/types';
import { loadUploads } from 'src/app/store/upload-feature/upload-feature.actions';
import { selectUploads } from 'src/app/store/upload-feature/upload-feature.reducer';
import { selectToken } from 'src/app/store/user-feature/user-feature.reducer';
import { environment } from 'src/environments/environment';
import { UiService } from '../ui/ui.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly uploadUrl = `${environment.apiUrl}/uploads`;

  private token$!: Observable<string>;
  private token!: string;

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store,
    private readonly uiService: UiService,
  ) {}

  downloadFile(url: string) {
    return this.http
      .get(url, {
        responseType: 'blob',
      })
      .pipe(
        catchError(error =>
          this.handleError(error as HttpErrorResponse, this.uiService),
        ),
      );
  }

  uploadFile(formData: FormData) {
    return this.http
      .post(this.uploadUrl, formData, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: this.getBearerToken(),
        },
      })
      .pipe(
        catchError(error =>
          this.handleError(error as HttpErrorResponse, this.uiService),
        ),
      );
  }

  getUploads() {
    this.uiService.showLoading();

    const uploads$ = this.http
      .get<Upload[]>(this.uploadUrl, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: this.getBearerToken(),
        },
      })
      .pipe(
        catchError(error =>
          this.handleError(error as HttpErrorResponse, this.uiService),
        ),
      );

    uploads$.subscribe(data => {
      console.log(data);
      this.store.dispatch(
        loadUploads({
          payload: {
            uploads: data,
          },
        }),
      );
      this.uiService.hideLoading();
    });
  }

  getBearerToken() {
    this.token$ = this.store.select(selectToken);

    this.token$.subscribe(data => {
      this.token = data;
    });

    return `Bearer ${this.token}`;
  }

  handleError(error: HttpErrorResponse, uiService: UiService) {
    uiService.hideLoading();
    if (error.error.error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      uiService.showErrorModal(error.error.error);
      return throwError(() => error);
    }

    if (error.message) {
      uiService.showErrorModal(error.message);
    }

    return throwError(() => new Error(error.message));
  }

  selectUploads() {
    return this.store.select(selectUploads);
  }
}
