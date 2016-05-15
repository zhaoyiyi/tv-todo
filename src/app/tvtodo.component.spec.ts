import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { TVtodoAppComponent } from '../app/tvtodo.component';

beforeEachProviders(() => [TVtodoAppComponent]);

describe('App: TVtodo', () => {
  it('should create the app',
      inject([TVtodoAppComponent], (app: TVtodoAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'tvtodo works!\'',
      inject([TVtodoAppComponent], (app: TVtodoAppComponent) => {
    expect(app.title).toEqual('tvtodo works!');
  }));
});
