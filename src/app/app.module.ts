import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { ReaderModule } from './reader/reader.module';
import { ComicModule } from './comic/comic.module';
import { ApplyModule } from './apply/apply.module';
import { BlogModule } from './blog/blog.module';
import { ListModule } from './list/list.module';

import { HomeState } from './home/home.state';
import * as HomeReducer from './home/home.reducer';
import { HomeEffects } from './home/home.effects';

export interface IAppState {
  home: HomeState;
  /*reader: SerieState;
  list: SerieState[];
  blog: Genre[];*/
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    HomeModule,
    AboutModule,
    ReaderModule,
    ComicModule,
    ApplyModule,
    BlogModule,
    ListModule,
    AppRoutingModule,
    StoreModule.forRoot({
      home: HomeReducer.HomeReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([
      HomeEffects
    ])
  ],
  declarations: [AppComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
