import fs from 'fs';
import path from 'path';
import { style } from "bun-style";
import { getYearDayInfo, initialFile } from '@lib/helpers';

export function* readAllFiles(dir: string): Generator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

const days: number[] = [];
for (const file of fs.readdirSync('./days', { withFileTypes: true })) if (file.name !== '.DS_Store') days.push(parseInt(file.name));
days.sort((a, b) => b - a);

const runDay = async (d: number) => {
  const day = require(`./days/${d}/`);

  try {
    console.log(style(`Day ${d}`, ['green']));
    if ('part1' in day) {
      console.write(style(` → Part 1: `, ['magenta']));
      const result = await day.part1();
      console.log(result);
    }

    if ('part2' in day) {
      console.write(style(` → Part 2: `, ['magenta']));
      const result = await day.part2();
      console.log(result);
    }
  } catch (e) {
    console.log(style('Error running day', ['red']) + ': ' + style((e as Error).message, ['gray']))
  }
}


for (const d of days) {
  try {
    await runDay(d)
    break;
  } catch (e) {
    const err = e as Error;
    if (err.name === 'ResolveMessage') {
      console.log(style('Creating initial files', ['italic', 'bold', 'yellow']));
      const path = (import.meta.dir).split('/');
      const year = parseInt(path[path.length - 1]);
      await Bun.write(import.meta.dir + '/days/' + d + '/index.ts', initialFile(year, d));
      console.write(style('Please restart bun: ', ['bold', 'green']));
      console.log(style('bun --watch ./', ['gray']));
      process.exit(0);
    } else {
      console.clear();
      console.error(err);
      break;
    }
  }
}