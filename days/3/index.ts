import * as helpers from '@helpers';
/**
 * Advent of Code 2024_3, Part 1
 * @author Keenan Nicholson
 */ 
export const part1 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text());
  const r = /(mul\([0-9]+,[0-9]+\))/g;
  const mul = /mul\(([0-9]+),([0-9]+)\)/g;
  let total = 0;
  let m: RegExpExecArray | null = null;
  while ((m = r.exec(input)) !== null) {
    m.forEach((match) => {
      const t = mul.exec(match);
      if (t !== null) total += parseInt(t[1]) * parseInt(t[2]);
    });
  }
  return total;
}

/**
 * Advent of Code 2024_3, Part 2
 * @author Keenan Nicholson
 */ 
export const part2 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text());
  const r = /(mul\([0-9]+,[0-9]+\)|do\(\)|don\'t\(\))/g;
  const mul = /mul\(([0-9]+),([0-9]+)\)/g;
  let total = 0;
  let enabled = true;
  let m: RegExpExecArray | null = null;
  while ((m = r.exec(input)) !== null) {
    m.forEach((match) => {
      if (match === 'do()') enabled = true;
      else if (match === 'don\'t()') enabled = false;
      else if (enabled) {
        const t = mul.exec(match);
        if (t !== null) total += parseInt(t[1]) * parseInt(t[2]);
      }
    });
  }
  return total;
}
