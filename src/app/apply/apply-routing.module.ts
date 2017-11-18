import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { ApplyComponent } from './apply.component';

const routes: Routes = Route.withShell([
    {
        path: 'apply',
        component: ApplyComponent,
        data: { title: extract('Apply') }
    }
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ApplyRoutingModule { }
