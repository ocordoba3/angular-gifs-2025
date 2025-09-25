import { Routes } from '@angular/router';
import { paths } from './utils/paths';

export const routes: Routes = [
    {
        path: paths.dashboard,
        loadComponent: () => import('./pages/dashboard/dashboard')
    },{
        path: paths.trending,
        loadComponent: () => import('./pages/trending/trending')
    },{
        path: paths.search,
        loadComponent: () => import('./pages/search/search')
    },
    {
        path: "**",
        redirectTo: paths.dashboard
    }
];
