import { builder, BuilderComponent } from '@builder.io/react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import '@builder.io/widgets';

export async function getStaticProps({
    params,
  }: GetStaticPropsContext<{ modelName: string }>) {
    const modelName = params?.modelName!
    const articleData =
      (await builder
        .get(modelName, {
        //   query: {
        //     'data.articleSlug': params?.article,
        //   },
        })
        .toPromise()) || null
  
  
    const articlePageTemplate =
      (await builder
        .get(modelName)
        .toPromise()) || null
  
        // console.log("WOZA: ", articleData, articlePageTemplate)
    return {
      props: {
        modelName,
        articleData,
        articlePageTemplate
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 5 seconds
      revalidate: 5,
    }
  }
  
  // returns a list
  export async function getStaticPaths() {
    const pages = await builder.getAll('ab-test-page', {
      options: { includeRefs: true },
      omit: 'data.blocks',
    })
    // console.log('PAGES: ', pages)
    return {
      paths: [], //pages.map((page) => `${page.data?.url}`),
      fallback: true,
    }
  }
export default function Preview({
    modelName,
    articleData,
    articlePageTemplate
}: InferGetStaticPropsType<typeof getStaticProps>) {
    // console.log('thisis preview props: ', props);
    // console.log('PREVIEW PROPS: ' ,articleData, articlePageTemplate)
    
    return <BuilderComponent model={modelName}></BuilderComponent>
}