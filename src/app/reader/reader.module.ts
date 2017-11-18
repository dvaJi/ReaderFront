import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ReaderRoutingModule } from './reader-routing.module';
import { ReaderComponent } from './reader.component';
import { ReaderService } from '../services/reader.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    ReaderRoutingModule
  ],
  declarations: [
    ReaderComponent
  ],
  providers: [
    ReaderService
  ]
})
export class ReaderModule { }
