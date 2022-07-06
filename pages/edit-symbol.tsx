import { BuilderComponent, builder } from '@builder.io/react';

// Replace with your Public API Key.
const BUILDER_API_KEY = 'e37b966ec695434bb21e97442a4a9f46'
builder.init(BUILDER_API_KEY);

// async function main () {

//     const page = (await builder.get('symbol', { options: { includeRefs: true }}).toPromise()) || null;
    
//     console.log('PAGE: ', page)
// }
// main();

export default function Symbol() {

  return <BuilderComponent model="symbol" options={{ includeRefs: true }}/> || null
}