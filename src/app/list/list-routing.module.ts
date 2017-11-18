import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { ListComponent } from './list.component';

const routes: Routes = Route.withShell([
    {
        path: 'browse',
        component: ListComponent,
        data: { title: extract('List') }
    }
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ListRoutingModule { }
