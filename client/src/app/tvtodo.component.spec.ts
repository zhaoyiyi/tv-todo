import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { TvtodoAppComponent } from '../app/tvtodo.component';

beforeEachProviders(() => [TvtodoAppComponent]);

describe('App: Tvtodo', () => {
  it('should create the app',
      inject([TvtodoAppComponent], (app: TvtodoAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'tvtodo works!\'',
      inject([TvtodoAppComponent], (app: TvtodoAppComponent) => {
    expect(app.title).toEqual('tvtodo works!');
  }));
});
