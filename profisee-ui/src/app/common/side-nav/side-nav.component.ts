
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  route: string;
  icon?: string;
  description: string;
}

@Component({
    selector: 'profisee-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    standalone: true,
    imports: [ CommonModule, RouterModule ]
  })
export class SideNavComponent implements OnInit {
  @Input() navItems: NavItem[] = [];
  isCollapsed = true;
  isPinned = false;
  activeRoute!: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = this.router.url;
      }
    });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  togglePin(): void {
    this.isPinned = !this.isPinned;
  }
}
