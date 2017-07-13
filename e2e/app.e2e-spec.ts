import { MbWebAngularPage } from './app.po';

describe('mb-web-angular App', () => {
  let page: MbWebAngularPage;

  beforeEach(() => {
    page = new MbWebAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
