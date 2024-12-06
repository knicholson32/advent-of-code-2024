import * as helpers from '@helpers';

/**
 * Advent of Code 2024_4, Part 1
 * @author Keenan Nicholson
 */
export const part1 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0).map((v) => v.split(''));


  const getDirectionalStringMatches = (x: number, y: number, xStep: number, yStep: number) => {
    let returnString = '';
    for (let i = 0; i < 4; i++) {
      try {
        returnString += input[y][x];
        x += xStep;
        y += yStep;
      } catch (e) {
        return false;
      }
    }
    return returnString === 'XMAS';
  }

  let total = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input.length; x++) {
      const char = input[y][x];
      if (char === 'X') {
        total += getDirectionalStringMatches(x, y, 0, 1) ? 1 : 0;
        total += getDirectionalStringMatches(x, y, 1, 1) ? 1 : 0;
        total += getDirectionalStringMatches(x, y, 1, 0) ? 1 : 0;
        total += getDirectionalStringMatches(x, y, 1, -1) ? 1 : 0;
        total += getDirectionalStringMatches(x, y, 0, -1) ? 1 : 0;
        total += getDirectionalStringMatches(x, y, -1, -1) ? 1 : 0;
        total += getDirectionalStringMatches(x, y, -1, 0) ? 1 : 0;
        total += getDirectionalStringMatches(x, y, -1, 1) ? 1 : 0;
      }
    }
  }

  return total;

}

/**
 * Advent of Code 2024_4, Part 2
 * @author Keenan Nicholson
 */ 
export const part2 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0).map((v) => v.split(''));


  const getDirectionalStringMatches = (x: number, y: number, xStep: number, yStep: number) => {
    let returnString = '';
    x -= xStep;
    y -= yStep;
    for (let i = 0; i < 3; i++) {
      try {
        returnString += input[y][x];
        x += xStep;
        y += yStep;
      } catch (e) {
        return false;
      }
    }
    return returnString === 'MAS' || returnString === 'SAM';
  }

  let total = 0;

  for (let y = 0; y < input.length; y++) for (let x = 0; x < input.length; x++) if (input[y][x] === 'A' && getDirectionalStringMatches(x, y, 1, 1) && getDirectionalStringMatches(x, y, -1, 1)) total++;

  return total;
}
