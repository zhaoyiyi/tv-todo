export class TVtodoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('tvtodo-app h1')).getText();
  }
}
