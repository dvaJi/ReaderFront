import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { ReleasesService } from './releases.service';

describe('ReleasesService', () => {
  let quoteService: ReleasesService;
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
  ], (_quoteService: ReleasesService,
      _mockBackend: MockBackend) => {

    quoteService = _quoteService;
    mockBackend = _mockBackend;
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getRandomReleases', () => {
    it('should return a random Chuck Norris quote', fakeAsync(() => {
      // Arrange
      const mockReleases = 'a random quote';
      const response = new Response(new ResponseOptions({
        body: { value: mockReleases }
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const randomReleasesSubscription = quoteService.getRandomReleases({ category: 'toto' });
      tick();

      // Assert
      randomReleasesSubscription.subscribe((quote: string) => {
        expect(quote).toEqual(mockReleases);
      });
    }));

    it('should return a string in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

      // Act
      const randomReleasesSubscription = quoteService.getRandomReleases({ category: 'toto' });
      tick();

      // Assert
      randomReleasesSubscription.subscribe((quote: string) => {
        expect(typeof quote).toEqual('string');
        expect(quote).toContain('Error');
      });
    }));
  });
});
