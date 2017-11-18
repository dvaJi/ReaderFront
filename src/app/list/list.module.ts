import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { ListService } from './list.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    ListRoutingModule
  ],
  declarations: [
    ListComponent
  ],
  providers: [
    ListService
  ]
})
export class ListModule { }
