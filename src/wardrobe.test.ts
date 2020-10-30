import {cartesian, sum, splitToMeasure, combinationsR, dedup, combinationsEqualling} from './wardrobe';


describe('cartesian', () => {

  test('empty lists', () => {
    expect(cartesian([], [])).toEqual([]);
  });

  test('one empty list', () => {
    expect(cartesian([1], [])).toEqual([]);
  });

  test('two single element lists', () => {
    expect(cartesian([1], [2])).toEqual([[1,2]]);
  });

  test('multi element lists', () => {
    expect(cartesian([1,2], [3,4])).
      toEqual([[1,3],[1,4], [2,3], [2,4]]);
  });

})

describe('sum', () => {
  test('empty list', () => {
    expect(sum([])).toBe(0);
  })

  test('single elem list', () => {
    expect(sum([7])).toBe(7);
  })

  test('multi elem list', () => {
    expect(sum([1,2,4])).toBe(7);
  })
})

describe('splitToMeasure', () => {
  test('happy path', () => {
    const max = 10;
    const a = [[1,2], [11], [1,2,3], [7,7], [5,4,1]];
    expect(splitToMeasure(max, a)).toEqual([
      [[1,2], [1,2,3]],
      [[5,4,1]]
    ]);
  })
})

describe('combinations', () => {
  test('happy path', () => {
    const max = 10;
    const amounts = [ 4,5 ];
    const result2 = combinationsR(
      max, 
      amounts, 
      [], 
      amounts.map(a => [a]));


    expect(result2).toEqual([
      [5, 5]
    ])

  })

  test('happy path 2', () => {
    const max = 250;
    const amounts = [ 50, 75, 100, 120];
    // const result2 = combinationsR(
    //   max, 
    //   amounts, 
    //   [], 
    //   amounts.map(a => [a]));

    // const sortedResults = result2.map(l => l.sort());
    // const dedupedSorted = dedup(sortedResults);

    const dedupedSorted = combinationsEqualling(250, amounts)

    const expectedResults = [
            [100,100,50],
            [100,75,75],
            [100,50,50,50],
            [50,50,75,75],
            [50,50,50,50,50]];

    expect(dedupedSorted.map(x =>  x.sort()).sort())
      .toEqual(expectedResults.map(x =>  x.sort()).sort());

  })
})

describe('dedup', () => {

  test.each( [
    [[],[]],
    [[1], [1]],
    [[1, 1], [1]],
    [[1, 2, 1], [1, 2]],
    [[[1]], [[1]]],
    [[[1], [1]], [[1]]],
    [[[1, 2], [1]], [[1], [1,2]]],
  ])('dedup', (a, expected) => {
    expect(dedup(a)).toEqual(expected);
  });
})

