import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoaderComponent } from './loader/loader.component';
import { ReleaseCardComponent } from './release-card/release-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LoaderComponent,
    ReleaseCardComponent
  ],
  exports: [
    LoaderComponent,
    ReleaseCardComponent
  ]
})
export class SharedModule { }
