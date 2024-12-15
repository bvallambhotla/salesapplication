import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavItem, SideNavComponent } from './common/side-nav/side-nav.component';
import { AppConfigurationService } from './services/configuration/app.service';
import { NotificationComponent } from './common/notifications/component/notification.component';
import { SpinnerComponent } from './common/spinner/components/spinner.component';
import { FeatureConfig } from './common/models/feature-config';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    SideNavComponent,
    NotificationComponent,
    SpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {

  navItems: NavItem[] = [];
  features: FeatureConfig[] = [];

  constructor() {
    const appConfigurations = new AppConfigurationService();
    this.navItems = appConfigurations.Features.map(({ path, title, icon, description }) => ({ route: path, label: title, icon, description }));
  }
}


