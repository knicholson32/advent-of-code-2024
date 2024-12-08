import * as helpers from '@helpers';
import { sleep } from 'bun';
import { style } from "bun-style";

type Direction = 'up' | 'right' | 'down' | 'left';

const travel = (map: string[][]) => {
  let startX = -1;
  let startY = -1;
  for (let x = 0; x < map[0].length && startX === -1 && startY === -1; x++) {
    for (let y = 0; y < map.length && startX === -1 && startY === -1; y++) {
      const char = map[y][x];
      if (char === '^') {
        startX = x;
        startY = y;
      }
    }
  }

  let traveling = true;
  let direction: Direction = 'up';
  let x = startX;
  let y = startY;

  while (traveling) {
    map[y][x] = 'X';
    // map[y][x] = style('X', ['red']);

    // console.clear();
    // for (let i = 0; i < map.length; i++) {
    //   const row = map[i];
    //   console.log(i.toFixed(0).padStart(3) + ' | ' + row.join(''));
    // }
    // await sleep(50);

    let currX = x;
    let currY = y;
    switch (direction) {
      case 'up':
        y--;
        break;
      case 'right':
        x++;
        break;
      case 'down':
        y++;
        break;
      case 'left':
        x--;
        break;
    }

    if (x < 0 || x >= map[0].length || y < 0 || y >= map.length) {
      // Out of bounds
      traveling = false;
      break;
    }

    if (map[y][x] === '#') {
      x = currX;
      y = currY;
      switch (direction) {
        case 'up':
          direction = 'right';
          break;
        case 'right':
          direction = 'down';
          break;
        case 'down':
          direction = 'left';
          break;
        case 'left':
          direction = 'up';
          break;
      }
    }
  }

  return map;
}

/**
 * Advent of Code 2024_6, Part 1
 * @author Keenan Nicholson
 */ 
export const part1 = async (): Promise<string | number> => {
  let map = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0).map((r) => r.split(''));

  map = travel(map);

  let locations = 0;
  for (const row of map) {
    for (const col of row) {
      if (col === 'X') locations++;
    }
  }

  return locations;
}
 

const encodeDirection = (tile: string, dir: Direction): string | false => {
  const directions = decodeDirections(tile);

  if (directions.findIndex((d) => d === dir) === -1) {
    // We need to add the direction to the tile
    // up, right, down, left
    // 0,  1,     2,    3

    directions.push(dir);

    let encodedNumber = 0;
    if (directions.includes('up')) encodedNumber = 0b1;
    if (directions.includes('right')) encodedNumber = encodedNumber | (0b1 << 1);
    if (directions.includes('down')) encodedNumber = encodedNumber | (0b1 << 2);
    if (directions.includes('left')) encodedNumber = encodedNumber | (0b1 << 3);
    tile = String.fromCharCode(encodedNumber + 65);
    return tile;
  } else {
    return false;
  }
}

const decodeDirections = (tile: string): Direction[] => {
  if (tile === '.' || tile === '#' || tile === '^') return [];
  const encodedNumber = tile.charCodeAt(0) - 65;
  const directions: Direction[] = [];
  if (encodedNumber & (0b1)) directions.push('up');
  if (encodedNumber & (0b1 << 1)) directions.push('right');
  if (encodedNumber & (0b1 << 2)) directions.push('down');
  if (encodedNumber & (0b1 << 3)) directions.push('left');
  return directions;
}

/**
 * Advent of Code 2024_6, Part 2
 * @author Keenan Nicholson
 */ 
export const part2 = async (): Promise<string | number> => {
  const backupMap = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0).map((r) => r.split(''));
  let map = backupMap.map((r) => r.join('').split(''));
  const travelMap = travel(backupMap.map((r) => r.join('').split('')));

  let startX = -1;
  let startY = -1;
  for (let x = 0; x < map[0].length && startX === -1 && startY === -1; x++) {
    for (let y = 0; y < map.length && startX === -1 && startY === -1; y++) {
      const char = map[y][x];
      if (char === '^') {
        startX = x;
        startY = y;
      }
    }
  }

  let looping = 0;
  
  for (let i = 0; i < map[0].length; i++) {
    for (let j = 0; j < map.length; j++) {

      if (backupMap[j][i] === '#' || travelMap[j][i] === '.') continue;
      


      let map = backupMap.map((r) => r.join('').split(''));
      map[j][i] = '#';
      
      let traveling = true;
      let direction: Direction = 'up';
      let x = startX;
      let y = startY;
      

      while (traveling) {

        let currX = x;
        let currY = y;
        const enc = encodeDirection(map[y][x], direction);

        if (enc === false) {
          looping++;
          traveling = false;
          break;
        } else map[y][x] = enc
        switch (direction) {
          case 'up':
            y--;
            break;
          case 'right':
            x++;
            break;
          case 'down':
            y++;
            break;
          case 'left':
            x--;
            break;
        }

        if (x < 0 || x >= map[0].length || y < 0 || y >= map.length) {
          // Out of bounds
          traveling = false;
          break;
        }

        if (map[y][x] === '#') {
          x = currX;
          y = currY;
          switch (direction) {
            case 'up':
              direction = 'right';
              break;
            case 'right':
              direction = 'down';
              break;
            case 'down':
              direction = 'left';
              break;
            case 'left':
              direction = 'up';
              break;
          }
        }
      }

    }
  }


  return looping;
}
