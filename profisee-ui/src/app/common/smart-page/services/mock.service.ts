//Todo: this can be enhanced and optimized with state management.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { handleError } from '../../error-handler/error-handler.operator';
import { NotificationService } from '../../notifications/services/notification.service';
import { SpinnerService } from '../../spinner/services/spinner.service';
import { withSpinner } from '../../spinner/operator/spinner.operator';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private notification: NotificationService,
    private spinnerService: SpinnerService
  ) {}

  getData(path: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`).pipe(
      withSpinner(this.spinnerService),
      handleError(this.notification, 'Failed to load data.'),
      map((data: any) => data[path])
    );
  }

  createData(path: string, data: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/${path}`, data)
      .pipe(
        withSpinner(this.spinnerService),
        handleError(this.notification, 'Failed to create item.')
      );
  }

  updateData(path: string, id: number, data: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/${path}/${id}`, data)
      .pipe(
        withSpinner(this.spinnerService),
        handleError(this.notification, 'Failed to update item.')
      );
  }

  deleteData(path: string, id: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/${path}/${id}`)
      .pipe(
        withSpinner(this.spinnerService),
        handleError(this.notification, 'Failed to delete item.')
      );
  }
}
