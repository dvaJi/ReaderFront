import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { ComicComponent } from './comic.component';

const routes: Routes = Route.withShell([
  { path: 'comic/:stub', component: ComicComponent, data: { title: extract('Comic') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ComicRoutingModule { }
