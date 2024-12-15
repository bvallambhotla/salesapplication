
import { Routes } from '@angular/router';
import { AppConfigurationService } from '../configuration/app.service';
import { HomeComponent } from '../../common/home/home.component';

const appConfigurations = new AppConfigurationService();

export const routes: Routes = [
	...[{ path: '', component: HomeComponent }],
	...appConfigurations.Features.map(config => ({
		path: config.path,
		component: config.component,
		data: { config }
	}))
]


