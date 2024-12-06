import * as helpers from '@helpers';
/**
 * Advent of Code 2024_5, Part 1
 * @author Keenan Nicholson
 */ 
export const part1 = async (): Promise<string | number> => {
  const inputRaw = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n\n').filter((v) => v.length > 0);

  const rulesRaw = inputRaw[0].split('\n').map((v) => v.split('|').map((v) => parseInt(v)));

  const rules: {[key: string]: { [key: string]: number }} = {};
  for (let i = 10; i < 100; i++) {
    const st = i.toFixed(0);
    if (!(st in rules)) rules[st] = {};
    for (const r of rulesRaw) {
      if (r[0] === i || r[1] === i) {
        if (r[0] === i) rules[st][r[1].toFixed(0)] = 1
        else rules[st][r[0].toFixed(0)] = -1
      }
    }
  }

  const jobs = inputRaw[1].split('\n').filter((b) => b.length > 0).map((b) => b.split(',').map((b) => parseInt(b)));

  let totals = 0;
  for (const job of jobs) {

    let sorted: number[] = [];
    sorted = job.toSorted((a, b) => {
      const aStr = a.toFixed(0);
      const bStr = b.toFixed(0);
      
      return rules[bStr][aStr]
    });

  
    if (helpers.isSame(job, sorted)) totals += job[(job.length + 1) / 2 - 1];
    
  }

  return totals;
}

/**
 * Advent of Code 2024_5, Part 2
 * @author Keenan Nicholson
 */ 
export const part2 = async (): Promise<string | number> => {
  const inputRaw = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n\n').filter((v) => v.length > 0);

  const rulesRaw = inputRaw[0].split('\n').map((v) => v.split('|').map((v) => parseInt(v)));

  const rules: { [key: string]: { [key: string]: number } } = {};
  for (let i = 10; i < 100; i++) {
    const st = i.toFixed(0);
    if (!(st in rules)) rules[st] = {};
    for (const r of rulesRaw) {
      if (r[0] === i || r[1] === i) {
        if (r[0] === i) rules[st][r[1].toFixed(0)] = 1
        else rules[st][r[0].toFixed(0)] = -1
      }
    }
  }

  const jobs = inputRaw[1].split('\n').filter((b) => b.length > 0).map((b) => b.split(',').map((b) => parseInt(b)));

  let totals = 0;
  for (const job of jobs) {

    let sorted: number[] = [];
    sorted = job.toSorted((a, b) => {
      const aStr = a.toFixed(0);
      const bStr = b.toFixed(0);

      return rules[bStr][aStr]
    });


    if (!helpers.isSame(job, sorted)) totals += sorted[(sorted.length + 1) / 2 - 1];

  }

  return totals;
}
