import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'enablingChapter',
    loadComponent: () =>
      import('./components/enabling-chapter/enabling-chapter').then((m) => m.EnablingChapter),
  },
  {
    path: 'imprintChapter',
    loadComponent: () =>
      import('./components/imprint-chapter/imprint-chapter').then((m) => m.ImprintChapter),
  },
];
