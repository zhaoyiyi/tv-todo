import chai from 'chai';
import tvdb from '../server/tvdb';

const expect = chai.expect;

describe('search tv series', () => {
  it('should return promise', () => {
    expect(tvdb.search('123')).to.be.a('promise');
  });
});