import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import Release from '../models/release';

const routes = {
  quote: () => `/api/v1/releases?per_page=24&page=1&orderby=desc_created`
};

@Injectable()
export class ReleasesService {

  constructor(private http: Http) { }

  getReleases(): Observable<Array<Release>> {
    return this.http.get(routes.quote(), { cache: true })
      .map((res: Response) => res.json())
      .map(body => body.chapters)
      .catch(() => Observable.of('Error, could not load any release'));
  }

}
