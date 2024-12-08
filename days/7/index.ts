import * as helpers from '@helpers';
/**
 * Advent of Code 2024_7, Part 1
 * @author Keenan Nicholson
 */ 
export const part1 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0).map((r) => r.split(': ').map((r, i) => {
    if (i === 0) return parseInt(r);
    else return r.split(' ').map((n) => parseInt(n));
  }));

  let equationSum = 0;
  for (const equation of input) {
    const target = equation[0] as number;
    const params = equation[1] as number[];

    let canBeTrue = false;
    for (let i = 0; i < Math.pow(2, params.length - 1); i++) {
      let total = params[0];
      for (let j = 1; j < params.length ; j++) {
        let val = params[j];
        if ((i & (0b1 << (j - 1))) !== 0) {
          total = total * val;
        } else {
          total = total + val;
        }
      }
      if (total === target) {
        canBeTrue = true;
        break;
      }
    }

    if (canBeTrue) equationSum += target;
  }

  return equationSum;
}

/**
 * Advent of Code 2024_7, Part 2
 * @author Keenan Nicholson
 */ 
export const part2 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0).map((r) => r.split(': ').map((r, i) => {
    if (i === 0) return parseInt(r);
    else return r.split(' ').map((n) => parseInt(n));
  }));

  let equationSum = 0;
  for (const equation of input) {
    const target = equation[0] as number;
    const params = equation[1] as number[];

    let canBeTrue = false;
    for (let i = 0; i < Math.pow(3, params.length - 1); i++) {
      let total = params[0];

      const base3 = i.toString(3).padStart(params.length, '0');

      for (let j = 1; j < params.length; j++) {
        let val = params[j];
        if (base3.charAt(j) === '0') {
          total = total * val;
        } else if (base3.charAt(j) === '1') {
          total = total + val;
        } else {
          total = parseInt(total.toFixed(0) + val.toFixed(0));
        }
      }
      
      if (total === target) {
        canBeTrue = true;
        break;
      }
    }

    if (canBeTrue) equationSum += target;
  }

  return equationSum;
}
