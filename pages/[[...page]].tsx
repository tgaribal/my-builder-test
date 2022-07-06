// import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, Builder, builder, withChildren, BuilderContent } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { getLayoutProps, getRibbonProps, getCustomCss } from '@lib/get-component-props'
import { Link } from '@components/Link/Link'
import '@components/TestCustomComponent/TestCustomComponent';
import '@components/testerWithChildern';
// import '@components/BetterComponent/BetterComponent';
import '@builder.io/widgets';

const BUILDER_API_KEY = 'e37b966ec695434bb21e97442a4a9f46'
builder.init(BUILDER_API_KEY)

// tells you what paths are being built
export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ page: string[] }>) {
  const page =
    (await builder
      .get('page', {
        userAttributes: {
          urlPath: '/' + (params?.page?.join('/') || '')
        },
        options: {
          includeRefs: true,
          noTraverse: false
        }
      })
      .toPromise()) || null
      const serverResults = {yourResults: 'THERE'}
      
// console.log('PAGEERAER', page)
  return {
    props: {
      page,
      serverResults,
      ...(await getLayoutProps()),
      ...(await getRibbonProps()),
      ...(await getCustomCss()),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  }
}

// returns a list
export async function getStaticPaths() {

  const pages = await builder.getAll('page', {
    options: { noTargeting: true },
    omit: 'data.blocks',
  })

  // console.log('PAGESSSS', pages.length)
  pages.map((thing) => {
    const page = `${thing.data?.url}`;
    // console.log('PAGESSSS: ', page);
    return page;
  });
  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true,
//   }
// }
function handleSubmit() {
  console.log('hello!!!')
}
// React Component
export default function Page({
  page,
  serverResults
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  // console.log("QUERY: ", router.query.preview)
  // console.log('REOUTER: ', router.query.preview );
  console.log('PAGE DATA: ', page?.data?.title)
  const testFn = () => {
    console.log('hello');
  }

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }
  const isLive = !Builder.isEditing && !Builder.isPreviewing
  
  if ((!page && isLive)){//|| (isLive && !router.query.preview)) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }
  
  return (
    <>
      <Head>
        <title>{page?.data?.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <BuilderContent content={page} model="page"> 
        {(variant, loading, content) => {
        // console.log('PAGE DATA: ', variant);
        // console.log('PAGE CONTENT: ', content);
        // console.log('PAGE PAGE: ', page);
        // console.log('VARIANT ID: ', content.testVariationId);
        // console.log('VARIANT NAME: ', content.testVariationName)

        return(
            <BuilderComponent model="page" 
              content={content} 
              data={{ loggedIn: true, variant }}
              options={{includeRefs: true}}
              context={{
                handleSubmit, 
                clickOnPage: (e: any) => {
                  console.log('EVENT: ', e.target.dataset)
                  // if(e.target.dataset) {
                    //   state.testingEvent = e.target.dataset
                    // }
                    builder.track('custom-event');
                    builder.track('click-by-model', { meta: {modelClicked: 'page', isTesting: true}});
                    console.log('CLICK')
                    builder.trackConversion(99);
                  }
                }} >
              This is default component
            </BuilderComponent>
        )
              }}
        </BuilderContent>

    </>
  )
}
