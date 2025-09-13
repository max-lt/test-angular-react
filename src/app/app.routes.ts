import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'articles',
    children: [
      {
        path: '**',
        loadComponent: () =>
          import('./components.react/Articles.wrapper').then((m) => m.ArticlesWrapperComponent),
      },
    ],
  },
  {
    path: 'company',
    loadComponent: () => import('./components/demo').then((m) => m.Demo),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/demo').then((m) => m.Demo),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
