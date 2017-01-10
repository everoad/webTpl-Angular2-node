import { MyBoardPage } from './app.po';

describe('my-board App', function() {
  let page: MyBoardPage;

  beforeEach(() => {
    page = new MyBoardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
