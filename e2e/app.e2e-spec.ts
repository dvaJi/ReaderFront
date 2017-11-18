import { AppPage } from './app.po';

describe('app', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display hello message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Hello world !');
  });
});
