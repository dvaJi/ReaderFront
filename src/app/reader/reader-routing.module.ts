import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { ReaderComponent } from './reader.component';

const routes: Routes = Route.withShell([
    {
        path: 'reader/:id/:lang/:volume/:chapter/:subchapter',
        component: ReaderComponent,
        data: { title: extract('Reader') }
    }
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ReaderRoutingModule { }
