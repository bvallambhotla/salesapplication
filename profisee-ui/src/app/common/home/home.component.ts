import { Component } from '@angular/core';
import { AppConfigurationService } from '../../services/configuration/app.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatureConfig } from '../models/feature-config';

@Component({
    selector: 'profisee-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule]
  })
export class HomeComponent {
  features: FeatureConfig [] = []
  constructor() {
    const appConfigurations = new AppConfigurationService();
    this.features = appConfigurations.Features;
  }
  
}
