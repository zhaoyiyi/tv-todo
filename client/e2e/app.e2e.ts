import { TvtodoPage } from './app.po';

describe('tvtodo App', function() {
  let page: TvtodoPage;

  beforeEach(() => {
    page = new TvtodoPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('tvtodo works!');
  });
});
