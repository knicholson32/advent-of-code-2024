export const reverse = (s: string): string => s.split("").reverse().join("");

export const isSame = (a: any[], b: any[]): boolean => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

export const initialFile = (year: number, day: number) => {

return `import * as helpers from '@helpers';
/**
 * Advent of Code ${year}_${day}, Part 1
 * @author Keenan Nicholson
 */ 
export const part1 = async (): Promise<string | number> => {
  const input = (await (await helpers.loadInput(import.meta.dir)).text()).split('\\n').filter((v) => v.length > 0);
  return '';
}

// /**
//  * Advent of Code ${year}_${day}, Part 2
//  * @author Keenan Nicholson
//  */ 
// export const part2 = async (): Promise<string | number> => {
//   const input = (await (await helpers.loadInput(import.meta.dir)).text()).split('\\n').filter((v) => v.length > 0);
//   return '';
// }
`;
}

export const getYearDayInfo = (path: string) => {
  // Get date info
  const r = new RegExp(`\/([0-9]+)\/days\/([0-9]+)\/`);
  const regexResult = r.exec(path);
  if (regexResult === null) throw Error('Invalid file path structure: ' + path);
  const year = parseInt(regexResult[1]);
  const day = parseInt(regexResult[2]);

  return {year, day};
}

export const loadInput = async (base: string) => {

  const path = base + "/input.txt";
  let file = Bun.file(path);

  if (await file.exists()) return file;

  // File does not exist. We need to download it.

  // Get session info
  let f = Bun.file('./lib/data.json');
  let session = '';
  if (await f.exists() === false) {
    session = prompt('Please enter your AoC session token: ') ?? '';
    await Bun.write('./lib/data.json', JSON.stringify({ session }));
    let f = Bun.file('./lib/data.json');
  } else {
    session = (await f.json()).session as string;
  }
  if (session === '') throw new Error('Invalid session');

  // Get date info
  const { year, day } = getYearDayInfo(path);

  // Get the inout file
  const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    method: "GET",
    headers: {
      "Cookie": `session=${session}`
    },
  });

  if (response.status !== 200) throw new Error(`API Error ${response.status}: '${response.statusText}'. Is the challenge live yet?`);

  const body = await response.text();
  await Bun.write(path, body);

  return Bun.file(path);

}