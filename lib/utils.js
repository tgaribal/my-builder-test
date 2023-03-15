import stringify from 'fast-json-stable-stringify'

export function encodeOptions(options) {
  const json = stringify(options)
  return encodeURI(json);
}

export function decodeOptions(path) {
  console.log('HELLO JSON3: ', decodeURI(path));
  return JSON.parse(decodeURI(path));
}