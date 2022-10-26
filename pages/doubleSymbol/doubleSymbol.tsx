import { BuilderComponent, builder } from '@builder.io/react';
import { InferGetStaticPropsType } from 'next';

// Replace with your Public API Key.
const BUILDER_API_KEY = 'e37b966ec695434bb21e97442a4a9f46'
builder.init(BUILDER_API_KEY);

export async function getStaticProps() {
    const symbolOne = (await builder
        .get('symbol', {
            key: 'first'
        })
        .toPromise()) || null;
    const symbolTwo = (await builder
        .get('symbol', {
            key: 'second',
            query: {
                id: '66bf2bfb01374a6bb2700db01c182a1f'
            }
        })
        .toPromise()) || null;
    // fetch('https://cdn.builder.io/api/v2/content/symbol/397d5a565c424ba18dd6c8c59d534705?apiKey=e37b966ec695434bb21e97442a4a9f46')
    //     .then(res => res.json());
    // const symbolTwo = await fetch('https://cdn.builder.io/api/v2/content/symbol/6e1763a1532c4e47b5724d968382a28e?apiKey=e37b966ec695434bb21e97442a4a9f46')
    //     .then(res => res.json());
    const author = (await builder
        .get('author', {
          includeRefs: true,
          options: { noTraverse: false },
        //   noTraverse: false,  
          query: {
            id: 'fa5a847a6271449dac2a4548dacba333',
          },
        })
        .promise()) || null
    return {
        props: {
            symbolOne,
            symbolTwo, 
            author
        }
    }
}

export default function DoubleSymbolPage({ symbolOne, symbolTwo, author }: InferGetStaticPropsType<typeof getStaticProps>) {
// console.log('HKAHSDKASHDF', symbolOne, symbolTwo, author);
  return (
      <>
        {/* <BuilderComponent
            model="symbol"

            content={symbolOne}
        /> */}
        <BuilderComponent 
            model="symbol" 
            content={symbolTwo} 
            data={{ author: { value: {...author} } }}
            options={{ key: 'foobar', query: '66bf2bfb01374a6bb2700db01c182a1f', includeRefs: true }}
        />


    </>
  )
}