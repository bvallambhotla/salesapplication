import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../../notifications/services/notification.service';
import { handleError } from '../../error-handler/error-handler.operator';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private baseUrl = '/api';
  private cache: any = null;

  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) {
    this.refreshLookups();
  }

  public fetchLookups(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/lookups`).pipe(
      tap(data => {
        this.cache = data;
      }),
      handleError(this.notification, 'Failed to load Lookup. Functionality will be limited.')
    );
  }

  get customers(): any[] {
    if (!this.cache) {
      this.refreshLookups();
    }
    return this.cache?.customers || [];
  }

  get salespersons(): any[] {
    if (!this.cache) {
      this.refreshLookups();
    }
    return this.cache?.salespersons || [];
  }

  get products(): any[] {
    if (!this.cache) {
      this.refreshLookups();
    }
    return this.cache?.products || [];
  }

  get discounts(): any[] {
    if (!this.cache) {
      this.refreshLookups();
    }
    return this.cache?.discounts || [];
  }

  getLookup(key: string): any[] {
    if (!this.cache) {
      this.refreshLookups();
    } return this.cache ? this.cache[key] || [] : [];
  }

  refreshLookups(): void {
    this.fetchLookups().subscribe();
  }
}

