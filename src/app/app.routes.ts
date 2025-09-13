import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'articles',
    pathMatch: 'prefix',
    resolve: {
      noop: () => console.log('Resolving articles route'),
    },
    loadComponent: () =>
      import('./components.react/Articles.wrapper').then((m) => m.ArticlesWrapperComponent),
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
