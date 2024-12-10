import * as helpers from '@helpers';


/**
 * Advent of Code 2024_10, Part 1
 * @author Keenan Nicholson
 */ 
export const part1 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0).map((r) => r.split('').map((v) => parseInt(v)));

  type TrailHead = {
    x: number,
    y: number,
    visitedPeaks: { x: number, y: number }[];
  }

  const trailHeads: TrailHead[] = [];

  for (let y = 0; y < input.length; y++) for (let x = 0; x < input[0].length; x++) if (input[y][x] === 0) trailHeads.push({ x, y, visitedPeaks: [] });

  const getOptions = (x: number, y: number, currentValue: number): { xStep: number, yStep: number }[] => {
    const nextValue = currentValue + 1;

    let options: { xStep: number, yStep: number }[] = [];

    // Check Up
    if (y - 1 >= 0 && input[y - 1][x] === nextValue) options.push({ xStep: 0, yStep: -1 });

    // Check Right
    if (x + 1 < input[0].length && input[y][x + 1] === nextValue) options.push({ xStep: 1, yStep: 0 });

    // Check Down
    if (y + 1 < input.length && input[y + 1][x] === nextValue) options.push({ xStep: 0, yStep: 1 });

    // Check Left
    if (x - 1 >= 0 && input[y][x - 1] === nextValue) options.push({ xStep: -1, yStep: 0 });

    return options;
  }


  const traverse = (trailHead: TrailHead, pos?: { x: number, y: number }) => {
    if (pos === undefined) pos = {x: trailHead.x, y: trailHead.y };

    const currentValue = input[pos.y][pos.x];
    if (currentValue === 9) {
      if (trailHead.visitedPeaks.findIndex((p) => p.x === pos.x && p.y === pos.y) === -1) trailHead.visitedPeaks.push({ x: pos.x, y: pos.y });
    } else {
      const options = getOptions(pos.x, pos.y, currentValue);
      for (const option of options) traverse(trailHead, { x: pos.x + option.xStep, y: pos.y + option.yStep });
    }

  }

  let total = 0;
  for (const trailHead of trailHeads) {
    traverse(trailHead);
    total += trailHead.visitedPeaks.length;
  }


  return total;
}

/**
 * Advent of Code 2024_10, Part 2
 * @author Keenan Nicholson
 */ 
export const part2 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0).map((r) => r.split('').map((v) => parseInt(v)));

  type TrailHead = {
    x: number,
    y: number,
    score: number;
  }

  const trailHeads: TrailHead[] = [];

  for (let y = 0; y < input.length; y++) for (let x = 0; x < input[0].length; x++) if (input[y][x] === 0) trailHeads.push({ x, y, score: 0 });

  const getOptions = (x: number, y: number, currentValue: number): { xStep: number, yStep: number }[] => {
    const nextValue = currentValue + 1;

    let options: { xStep: number, yStep: number }[] = [];

    // Check Up
    if (y - 1 >= 0 && input[y - 1][x] === nextValue) options.push({ xStep: 0, yStep: -1 });

    // Check Right
    if (x + 1 < input[0].length && input[y][x + 1] === nextValue) options.push({ xStep: 1, yStep: 0 });

    // Check Down
    if (y + 1 < input.length && input[y + 1][x] === nextValue) options.push({ xStep: 0, yStep: 1 });

    // Check Left
    if (x - 1 >= 0 && input[y][x - 1] === nextValue) options.push({ xStep: -1, yStep: 0 });

    return options;
  }


  const traverse = (trailHead: TrailHead, pos?: { x: number, y: number }) => {
    if (pos === undefined) pos = { x: trailHead.x, y: trailHead.y };

    const currentValue = input[pos.y][pos.x];
    if (currentValue === 9) {
      trailHead.score++;
    } else {
      const options = getOptions(pos.x, pos.y, currentValue);
      for (const option of options) traverse(trailHead, { x: pos.x + option.xStep, y: pos.y + option.yStep });
    }

  }

  let total = 0;
  for (const trailHead of trailHeads) {
    traverse(trailHead);
    total += trailHead.score;
  }


  return total;
}
