import { expect } from 'chai';
import { WoodCutter } from '../lib/woodcutter';

describe('WoodCutter', () => {
  const woodcutter: WoodCutter = new WoodCutter({});

  it('should exist', () => {
    expect(woodcutter).to.exist;
  });
});
