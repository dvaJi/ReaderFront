import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { InfiniteScrollerDirective } from './infinite-scroll.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    InfiniteScrollerDirective
  ],
  exports: [
    LoaderComponent
  ]
})
export class SharedModule { }
