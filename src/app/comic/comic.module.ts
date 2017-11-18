import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ComicRoutingModule } from './comic-routing.module';
import { ComicComponent } from './comic.component';
import { ComicService } from '../services/comic.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    ComicRoutingModule
  ],
  declarations: [
    ComicComponent
  ],
  providers: [
    ComicService
  ]
})
export class ComicModule { }
