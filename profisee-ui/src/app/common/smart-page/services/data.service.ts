
//Todo: Interactions to this service enhanced with state management. 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { handleError } from '../../error-handler/error-handler.operator';
import { NotificationService } from '../../notifications/services/notification.service';
import { SpinnerService } from '../../spinner/services/spinner.service';
import { withSpinner } from '../../spinner/operator/spinner.operator';
import { handleSuccess } from '../../success-handler/success-handler.operator';
import { LookupService } from './lookupservice';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api';

  constructor(
    private http: HttpClient,
    private notification: NotificationService,
    private spinnerService: SpinnerService,
    private lookupService: LookupService
  ) { }

  getData(path: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${path}`)
      .pipe(
        withSpinner(this.spinnerService),
        handleError(this.notification, 'Failed to load data.')
      );
  }

  createData(path: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${path}`, data)
      .pipe(
        withSpinner(this.spinnerService),
        handleSuccess(this.notification, 'Sucessfully created.'),
        handleError(this.notification, 'Failed to create item.'),
        tap(() => this.lookupService.refreshLookups())
      );
  }

  updateData(path: string, id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${path}`, data)
      .pipe(
        withSpinner(this.spinnerService),
        handleSuccess(this.notification, 'Sucessfully updated.'),
        handleError(this.notification, 'Failed to update item.'),
        tap(() => this.lookupService.refreshLookups())
      );
  }

  deleteData(path: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${path}/${id}`)
      .pipe(
        withSpinner(this.spinnerService),
        handleSuccess(this.notification, 'Sucessfully deleted.'),
        handleError(this.notification, 'Failed to delete item.'),
        tap(() => this.lookupService.refreshLookups())
      );
  }
}
