import { TVtodoPage } from './app.po';

describe('tvtodo App', function() {
  let page: TVtodoPage;

  beforeEach(() => {
    page = new TVtodoPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('tvtodo works!');
  });
});
