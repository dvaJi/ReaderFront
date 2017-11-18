import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { BlogComponent } from './blog.component';

const routes: Routes = Route.withShell([
    {
        path: 'blog',
        component: BlogComponent,
        data: { title: extract('Blog') }
    }
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class BlogRoutingModule { }
