import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import * as HomeActions from './home.action';
import { HomeState, ChapterState } from './home.state';
import { ReleasesService } from '../services/releases.service';

@Injectable()
export class HomeEffects {

    @Effect()
    GetLatestReleases$: Observable<Action> = this.actions$.
        ofType<HomeActions.GetLatestReleases>(HomeActions.GET_LATEST_RELEASES)
        .mergeMap(action =>
            this.releasesService.getReleases(action.id)
                .map(releases => {
                    return new HomeActions.GetLatestReleasesSuccess(releases as ChapterState[]);
                })
                .catch(() => of(new HomeActions.GetLatestReleasesError()))
        );

    constructor(private actions$: Actions, private releasesService: ReleasesService) { }

}
