import 'rxjs/add/operator/finally';
import { Observable } from 'rxjs/Observable';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { HomeState, ChapterState } from './home.state';
import * as HomeAction from './home.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  releases$: Observable<HomeState>;
  isLoading: boolean;

  constructor(private store: Store<HomeState>) { }

  ngOnInit() {
    this.isLoading = true;
    this.releases$ = this.store.select(state => state);
    this.store.dispatch(new HomeAction.GetLatestReleases());
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

  onScroll() {
    console.log('??????????????');
  }

}
