import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import Release from '../models/release';

const routes = {
  releases: (page: number) => `/api/v1/releases?per_page=24&page=${page}&orderby=desc_created`
};

@Injectable()
export class ReleasesService {

  constructor(private http: Http) { }

  getReleases(page: number = 1): Observable<Release[]> {
    return this.http.get(routes.releases(page), { cache: true })
      .map((res: Response) => res.json())
      .catch(() => Observable.of('Error, could not load any release'));
  }

}
