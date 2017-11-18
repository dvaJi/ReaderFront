import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { ReleasesService } from './releases.service';
import Chapter from '../models/chapter';

describe('ReleasesService', () => {
  let releasesService: ReleasesService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReleasesService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  beforeEach(inject([
    ReleasesService,
    MockBackend
  ], (_releasesService: ReleasesService,
      _mockBackend: MockBackend) => {

    releasesService = _releasesService;
    mockBackend = _mockBackend;
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getRandomReleases', () => {
    it('should return a random Chuck Norris quote', fakeAsync(() => {
      // Arrange
      const mockReleases: Chapter[] = [];
      const response = new Response(new ResponseOptions({
        body: mockReleases
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const randomReleasesSubscription = releasesService.getReleases(1);
      tick();

      // Assert
      randomReleasesSubscription.subscribe((quote: Chapter[]) => {
        expect(quote).toEqual(mockReleases);
      });
    }));

    it('should return a string in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

      // Act
      const randomReleasesSubscription = releasesService.getReleases(0);
      tick();

      // Assert
      randomReleasesSubscription.subscribe((quote: Chapter[]) => {
        expect(typeof quote).toEqual('string');
      });
    }));
  });
});
