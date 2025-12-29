import { Routes } from '@angular/router';
import { EnablingChapter } from './components/enabling-chapter/enabling-chapter';
import { ImprintChapter } from './components/imprint-chapter/imprint-chapter';

export const routes: Routes = [
  {
    path: 'enablingChapter',
    component: EnablingChapter,
  },
  {
    path: 'imprintChapter',
    component: ImprintChapter,
  },
];
