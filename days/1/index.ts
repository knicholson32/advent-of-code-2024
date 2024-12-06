import * as helpers from '@helpers';
/**
 * Advent of Code 2024_1, Part 1
 * @author Keenan Nicholson
 */ 
export const part1 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0).flatMap((v) => v.split('   ')).flatMap((v) => parseInt(v));

  const col: number[][] = [[], []];

  for (let i = 0; i < input.length; i++) {
    const v = input[i];
    col[i % 2].push(v);
  }

  col[0].sort((a, b) => a - b);
  col[1].sort((a, b) => a - b);

  let total = 0;
  for (let i = 0; i < input.length / 2; i++) total += Math.abs(col[0][i] - col[1][i]);

  return total;
}

/**
 * Advent of Code 2024_1, Part 2
 * @author Keenan Nicholson
 */ 
export const part2 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0).flatMap((v) => v.split('   ')).flatMap((v) => parseInt(v));

  const col: number[][] = [[], []];

  for (let i = 0; i < input.length; i++) {
    const v = input[i];
    col[i % 2].push(v);
  }


  let total = 0;
  for (const v of col[0]) total += v * (col[1].filter((b) => b === v)).length;

  return total;
}
