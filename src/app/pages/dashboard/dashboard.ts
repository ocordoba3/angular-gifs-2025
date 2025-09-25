import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { paths } from '@app/utils/paths';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export default class Dashboard {
  PATHS = paths;
  router = inject(Router);

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
