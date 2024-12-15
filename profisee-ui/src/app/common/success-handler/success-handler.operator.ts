import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../notifications/services/notification.service';

export function handleSuccess<T>(notification: NotificationService, message: string) {
	return (source: Observable<T>) => source.pipe(
		tap(() => {
			notification.showNotification('success', message);
		})
	);
}
