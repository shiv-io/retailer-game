import findRoot from 'find-root';

export const projectRoot = findRoot(__dirname).replace(/\\/g, '/');

export function fullPath(path) {
  return `${projectRoot}/docs/${path}`;
}

const DEMANDS_PATH = fullPath('demands.csv');
const MAX_PATH = fullPath('max.csv');

export {
  DEMANDS_PATH,
  MAX_PATH,
};
