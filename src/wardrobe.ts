function flatten<T>(a: T[][]) {
  return ([] as T[]).concat(...a);
}

export function cartesian<A,B>(as: A[], bs: B[]): [A,B][] {
  const result :[A,B][][] = 
    as.map(a => bs.map(b => [a,b]));
  return flatten(result);
}

export function sum(a: number[]): number {
  return a.reduce((acc,v) => acc + v, 0);
}

// returns [elements summing to under n, elements summing equal to n]
// (throws the result away)
export function splitToMeasure(n: number, a: number[][])
  : [number[][], number[][]] {

  let init: [number[][], number[][]] = [[], []];
  const reducer = (acc: [number[][], number[][]], v: number[]) : [number[][], number[][]] => {
    const [under, equal] = acc;
    const total = sum(v);
    if (total < n) {
      under.push(v);
    }
    if (total === n) {
      equal.push(v)
    }
    return [under, equal];
  };
  return a.reduce(reducer, init);
}

export function combinationsEqualling(n: number, amounts: number[]) {
  const [under, equal] = splitToMeasure(n, amounts.map(x => [x]));
  const combos = combinationsR(n, amounts, equal, under);

  const sortedResults = combos.map(l => l.sort());
  return dedup(sortedResults);
}

export function combinationsR(
  n: number, 
  amounts: number[], 
  accum: number[][],
  under: number[][])
  : number[][] {

  const x: [number[],number][] = cartesian(under, amounts)
  const y: number[][] = x.map(([ns,n]) => ns.concat([n]))

  const [under2, equal] = splitToMeasure(n, y);

  return ((under2.length === 0)?
    accum.concat(equal)
    : combinationsR(n, amounts, accum.concat(equal), under2));
}

function arrayToMap(as: any[]) {
  return as.reduce(
    (acc: any, x: any) => { acc[x.toString()] = x; return acc; }, 
    {});
}

function mapValuesToList(o: any) {
  return Object.getOwnPropertyNames(o).map(p => o[p])
}

export function dedup(as: any[]): any[] {
  return mapValuesToList( arrayToMap(as) );
}
