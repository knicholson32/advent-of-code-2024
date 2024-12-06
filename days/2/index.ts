import * as helpers from '@helpers';

const isReportSafe = (report: number[]): boolean => {
  let lastLevel = report[0];
  let direction: 'inc' | 'dec' = report[0] < report[1] ? 'inc' : 'dec';
  for (let i = 1; i < report.length; i++) {
    const currentLevel = report[i];
    if (currentLevel === lastLevel || Math.abs(currentLevel - lastLevel) > 3) return false;
    if (direction === 'inc' && currentLevel < lastLevel) return false;
    else if (direction === 'dec' && currentLevel > lastLevel) return false;
    lastLevel = currentLevel;
  }
  return true;
}


/**
 * Advent of Code 2024_2, Part 1
 * @author Keenan Nicholson
 */ 
export const part1 = async (): Promise<string | number> => {
  const input = ((await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0)).map((b) => (b.split(' ')).flatMap((b) => parseInt(b)));

  let safeCount = 0;
  for (const report of input) if (isReportSafe(report)) safeCount++;

  return safeCount;
}

/**
 * Advent of Code 2024_2, Part 2
 * @author Keenan Nicholson
 */ 
export const part2 = async (): Promise<string | number> => {
  const input = ((await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0)).map((b) => (b.split(' ')).flatMap((b) => parseInt(b)));

  let safeCount = 0;
  for (const report of input) {
    if (isReportSafe(report)) safeCount++;
    else {
      // We will try to make the report safe
      for (let i = 0; i < report.length; i++) {
        if (isReportSafe(report.filter((_, idx) => idx !== i))) {
          safeCount++;
          break;
        }
      }
    }
  }

  return safeCount;
}
