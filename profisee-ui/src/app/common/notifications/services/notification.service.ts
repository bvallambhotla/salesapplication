import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  id: number;
  type: string;
  message: string;
  autoHide: boolean;
  autoHideTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: Notification[] = [];
  private notificationSubject = new Subject<Notification[]>();

  notifications$ = this.notificationSubject.asObservable();

  private nextId = 1;

  showNotification(type: string, message: string, autoHide = true, autoHideTime = 3000): void {
    const notification: Notification = { id: this.nextId++, type, message, autoHide, autoHideTime };
    this.notifications.push(notification);
    this.notificationSubject.next(this.notifications);

    if (autoHide) {
      setTimeout(() => this.removeNotification(notification.id), autoHideTime);
    }
  }

  removeNotification(id: number): void {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
    this.notificationSubject.next(this.notifications);
  }
}
