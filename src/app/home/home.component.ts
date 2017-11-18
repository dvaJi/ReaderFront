import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Component, OnInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';

import { HomeState, ChapterState } from './home.state';
import * as HomeAction from './home.action';
import * as fromHome from './home.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  releases$: Observable<any>;
  isLoading: boolean;
  page = 1;

  constructor(private store: Store<HomeState>, public el: ElementRef) { }

  ngOnInit() {
    this.isLoading = true;
    this.releases$ = this.store.select(fromHome.selectAll);
    this.store.dispatch(new HomeAction.GetLatestReleases(this.page));

    this.releases$.subscribe(releases => {
      if (releases[10] !== undefined) {
        console.log('asda', releases);
        this.isLoading = false;
      }
    });
  }

  /**
   * @author dvaJi
   * @param chapterDate
   * @returns boolean
   */
  public isNew(chapterDate: Date) {
    const now = new Date();
    now.setDate(now.getDate() - 5);

    return (chapterDate > now);
  }

  public load() {
    this.page += 1;
    this.store.dispatch(new HomeAction.GetLatestReleases(this.page));
  }

}
