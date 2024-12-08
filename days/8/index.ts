import * as helpers from '@helpers';
import { sleep } from 'bun';
import { style } from 'bun-style';

const findAntenna = (map: string[][], char: string): [number, number][] => {
  const output: [number, number][] = [];
  for (let i = 0; i < map.length; i++) {
    const col = map[i];
    for (let j = 0; j < col.length; j++) {
      const c = col[j];
      if (c === char) output.push([j, i]);
    }
  }
  return output;
}

const printMap = async (map: string[][], clear = true) => {
  if (clear) console.clear();
  for (const row of map) console.log(row.join(''));
  await sleep(100);
}

/**
 * Advent of Code 2024_8, Part 1
 * @author Keenan Nicholson
 */ 
export const part1 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0).map((r) => r.split(''));
  let nodeMap = input.map((r) => r.join('').split(''));


  const xBounds = input[0].length;
  const yBounds = input.length;

  const charList: string[] = [];
  for (const row of input) for (const char of row) if (char !== '.' && !charList.includes(char)) charList.push(char)
  
  for (const char of charList) {
    const coords = findAntenna(input, char);
    
    for (let i = 0; i < coords.length; i++) {
      const base = coords[i];
      for (let j = 0; j < coords.length; j++) {
        if (j === i) continue;
        const target = coords[j];
        const xDiff = target[0] - (base[0] - target[0]);
        const yDiff = target[1] - (base[1] - target[1]);

        if (xDiff >= 0 && xDiff < xBounds && yDiff >= 0 && yDiff < yBounds) nodeMap[yDiff][xDiff] = '#';
      }
    }
  }

  console.log();
  await printMap(nodeMap.map((r) => r.join('').split('').map((c) => {
    if (c === '#') return style('#', ['yellow']);
    return style(c, ['gray']);
  })), false);
  console.log();

  let nodeCount = 0;
  for (const row of nodeMap) for (const char of row) if (char === '#') nodeCount++

  return nodeCount;
}

/**
 * Advent of Code 2024_8, Part 2
 * @author Keenan Nicholson
 */ 
export const part2 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0).map((r) => r.split(''));
  let nodeMap = input.map((r) => r.join('').split(''));


  const xBounds = input[0].length;
  const yBounds = input.length;

  const charList: string[] = [];
  for (const row of input) for (const char of row) if (char !== '.' && !charList.includes(char)) charList.push(char)

  for (const char of charList) {
    const coords = findAntenna(input, char);

    for (let i = 0; i < coords.length; i++) {
      const base = coords[i];
      for (let j = 0; j < coords.length; j++) {
        if (j === i) continue;
        const target = coords[j];

        const xDiff = (base[0] - target[0]);
        const yDiff = (base[1] - target[1]);

        let xPos = target[0];
        let yPos = target[1];

        nodeMap[target[1]][target[0]] = '#';
        nodeMap[base[1]][base[0]] = '#';

        let projecting = true;
        while (projecting) {
          xPos = xPos - xDiff;
          yPos = yPos - yDiff;
          if (xPos >= 0 && xPos < xBounds && yPos >= 0 && yPos < yBounds) nodeMap[yPos][xPos] = '#';
          else projecting = false;
        }
      }
    }
  }

  console.log();
  await printMap(nodeMap.map((r) => r.join('').split('').map((c) => {
    if (c === '#') return style('#', ['yellow', 'dim']);
    else if (c === '.' ) return style(c, ['gray']);
    return style(c, ['red']);
  })), false);
  console.log();

  let nodeCount = 0;
  for (const row of nodeMap) for (const char of row) if (char === '#') nodeCount++;

  return nodeCount;
}
