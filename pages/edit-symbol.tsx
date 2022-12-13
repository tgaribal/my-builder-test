import { BuilderComponent, builder } from '@builder.io/react';
import '@components/TestCustomComponent/TestCustomComponent';

// Replace with your Public API Key.
const BUILDER_API_KEY = 'e37b966ec695434bb21e97442a4a9f46'
builder.init(BUILDER_API_KEY);
let locale = 'en-US';

export default function Symbol() {
  return <BuilderComponent locale={locale} model="symbol" data={{ name: 'Steve '}} options={{ includeRefs: true }}/>
}