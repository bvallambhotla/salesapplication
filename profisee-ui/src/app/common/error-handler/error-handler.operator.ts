import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../notifications/services/notification.service';

export function handleError<T>(notificationService: NotificationService, message = 'An error occurred') {
  return (source: Observable<T>) => source.pipe(
    catchError(err => {
      notificationService.showNotification('danger', `${message}: ${err.message}`);
      return throwError(() => { new Error(err) });
    })
  );
}
