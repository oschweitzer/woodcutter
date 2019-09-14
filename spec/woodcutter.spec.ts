import {WoodCutter} from "../lib/woodcutter";
import {expect} from 'chai';

describe('WoodCutter', () => {

  const woodcutter: WoodCutter = new WoodCutter();

  it('should exist', () => {
    expect(woodcutter).to.exist;
  });
});
