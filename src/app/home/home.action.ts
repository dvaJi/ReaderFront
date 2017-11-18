import { HomeState, ChapterState } from './home.state';

import { Action } from '@ngrx/store';

export const GET_LATEST_RELEASES = '[Serie] GET_LATEST_RELEASES';
export const GET_LATEST_RELEASES_SUCCESS = '[Serie] GET_LATEST_RELEASES_SUCCESS';
export const GET_LATEST_RELEASES_ERROR = '[Serie] GET_LATEST_RELEASES_ERROR';

// Actions
export class GetLatestReleases implements Action {
    readonly type = GET_LATEST_RELEASES;
}

export class GetLatestReleasesSuccess implements Action {
    readonly type = GET_LATEST_RELEASES_SUCCESS;

    constructor(public payload: ChapterState[]) { }
}

export class GetLatestReleasesError implements Action {
    readonly type = GET_LATEST_RELEASES_ERROR;
}

export type All = GetLatestReleases | GetLatestReleasesSuccess | GetLatestReleasesError;
