import * as helpers from '@helpers';
import { sleep } from 'bun';
import { style } from 'bun-style';

/**
 * Advent of Code 2024_9, Part 1
 * @author Keenan Nicholson
 */ 
export const part1 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0)[0];

  let expandedDisk: number[] = [];

  let isFile = true;
  for (let i = 0; i < input.length; i ++) {
    const size = parseInt(input[i]);
    
    if (isFile) {
      const index = i / 2;
      for (let j = 0; j < size; j++) expandedDisk.push(index);
    } else {
      for (let j = 0; j < size; j++) expandedDisk.push(-1);
    }

    isFile = !isFile;
  }

  let idxA = 0;
  let idxB = expandedDisk.length - 1;

  while (expandedDisk[idxA] !== -1) idxA++;
  while (expandedDisk[idxB] === -1) idxB--;

  while (idxA < idxB) {

    expandedDisk[idxA] = expandedDisk[idxB];
    expandedDisk[idxB] = -1;

    while (expandedDisk[idxA] !== -1 && idxA < expandedDisk.length) idxA++;
    while (expandedDisk[idxB] === -1 && idxB >= 0) idxB--;
  }


  let checksum = 0;
  for (let i = 0; i < expandedDisk.length; i++) {
    if (expandedDisk[i] === -1) break;
    checksum += i * expandedDisk[i];
  }

  return checksum;
}

/**
 * Advent of Code 2024_9, Part 2
 * @author Keenan Nicholson
 */ 
export const part2 = async (): Promise<string | number> => {
  let input = ((await (await helpers.loadInput(import.meta.dir)).text()).split('\n').filter((v) => v.length > 0)[0]).split('');

  
  let objectInput: {index: number, f: number, g: number}[] = [];
  
  for (let i = 0; i < input.length; i+= 2) objectInput.push({index: i/2, f: parseInt(input[i]), g: parseInt(input[i + 1] ?? '0')});

  let noGapsBefore = 0;
  let counter = 0;

  let expandedDisk: number[] = [];
  let isFile = true;

  for (let i = objectInput.length - 1; i >= 0; i--) {
    const descriptor = objectInput[i];

    const fileSize = descriptor.f;

    let toPlaceAt = -1;

    let modifyGapOpt = true;
    for (let j = noGapsBefore; j < i; j++) {
      const gapTarget = objectInput[j].g;
      if (gapTarget !== 0 && modifyGapOpt) {
        noGapsBefore = j - 1;
        modifyGapOpt = false;
      }
      if (gapTarget >= fileSize) {
        toPlaceAt = j;
        break;
      }
    }

    if (toPlaceAt !== -1) {

      // We have somewhere to place this file
      // We have this (for example) (with a file of size 2)
      // 5 ... 6 ... 5 ...
      // f ... g ... f ...
      //
      // We need:
      // 5 ... 0 ... 3 ... 2 ... 5 ...
      // f ... g ... f ... g ... f ...

      const descriptorToPlace = objectInput[toPlaceAt];
  
      objectInput[i - 1].g = descriptor.f + descriptor.g + objectInput[i - 1].g;
      objectInput.splice(i, 1);
      objectInput.splice(toPlaceAt + 1, 0, { index: descriptor.index, f: descriptor.f, g: descriptorToPlace.g - descriptor.f });
      objectInput[toPlaceAt].g = 0;

      i++;

    }

    counter++;

  }

  expandedDisk = [];
  isFile = true;
  for (let i = 0; i < objectInput.length; i++) {
    const descriptor = objectInput[i];

    for (let j = 0; j < descriptor.f; j++) expandedDisk.push(descriptor.index);
    for (let j = 0; j < descriptor.g; j++) expandedDisk.push(-1);

    isFile = !isFile;
  }

  let checksum = 0;
  for (let i = 0; i < expandedDisk.length; i++) {
    if (expandedDisk[i] === -1) continue;
    checksum += i * expandedDisk[i];
  }

  return checksum;
}
