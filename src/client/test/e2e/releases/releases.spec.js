/* jshint -W117 */
describe('E2E: Releases', function () {
  beforeEach(function() {
    browser.get('/');
  });

  it('should have releases in its <title> tag.', function() {
    expect(browser.getTitle()).toContain('releases');
  });

  it('should have nav button active', function() {
    var curNav = element(by.css('.current')).$('a');
    expect(curNav.getText()).toBe('Releases');
  });
});
