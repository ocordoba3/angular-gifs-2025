import { Component } from '@angular/core';
import { paths } from '../../utils/paths';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, RouterLink, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {

  envVars = environment;

  sidebarItems = [
    { name: 'Dashboard', path: paths.dashboard, icon: "dashboard" },
    { name: 'Tendencias', path: paths.trending, icon: "star" },
    { name: 'Buscar', path: paths.search, icon: "search" }
  ]

}
